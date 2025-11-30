// Modelos
const RegistroTratamiento = require("../models/RegistroTratamientoModels");
const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Tratamiento = require("../models/TratamientoModels");
const Enfermero = require("../models/EnfermeroModels");
const Admision = require("../models/AdmisionModels");
const RegistroMapper = require("../mappers/RegistroTratamientoMapper");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const { ADMISION_NO_ENCONTRADA_POR_ID } = require("../constants/AdmisionConstants");

const getTratamientosActivos = async (id_admision) => {
  const admision = await Admision.findByPk(id_admision);
  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  // Obtener evaluaciones y sus tratamientos asociados
  const evaluaciones = await EvaluacionMedica.findAll({
    where: { id_admision },
    include: [{
      model: Tratamiento,
      through: { attributes: [] }
    }],
    order: [['fecha', 'DESC']]
  });

  // Filtrar tratamientos únicos usando un Map
  const tratamientosMap = new Map();
  evaluaciones.forEach(ev => {
    if (ev.Tratamientos) {
      ev.Tratamientos.forEach(t => {
        if (!tratamientosMap.has(t.id_tratamiento)) {
          tratamientosMap.set(t.id_tratamiento, t);
        }
      });
    }
  });
  
  const listaTratamientos = Array.from(tratamientosMap.values());

  // 4. Buscar la fecha de la última aplicación para cada tratamiento
  const listaConEstado = await Promise.all(listaTratamientos.map(async (t) => {
      const tratamientoPlano = t.toJSON();

      const ultimoRegistro = await RegistroTratamiento.findOne({
          where: { 
              id_admision: id_admision,
              id_tratamiento: t.id_tratamiento
          },
          order: [['fecha_realizacion', 'DESC']]
      });

      tratamientoPlano.ultimo_registro = ultimoRegistro ? ultimoRegistro.fecha_realizacion : null;
      
      return tratamientoPlano;
  }));

  return listaConEstado;
};

const getHistorialRegistros = async (id_admision) => {
  const admision = await Admision.findByPk(id_admision);

  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  const registrosPrevios = await RegistroTratamiento.findAll({
    where: { id_admision },
    include: [
      { model: Tratamiento },
      { model: Enfermero }
    ],
    order: [['fecha_realizacion', 'DESC']]
  });

  return registrosPrevios.map(r => RegistroMapper.toDto(r));
};

const registrarEjecucion = async (requestDTO) => {
  const admision = await Admision.findByPk(requestDTO.id_admision);
  
  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  const entidad = RegistroMapper.toEntity(requestDTO);
  entidad.id_enfermero = requestDTO.id_enfermero; 
  
  await entidad.save();
  
  return true;
};

module.exports = {
  getTratamientosActivos,
  getHistorialRegistros,
  registrarEjecucion
};