const RegistroTratamiento = require("../models/RegistroTratamientoModels");
const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Tratamiento = require("../models/TratamientoModels");
const Enfermero = require("../models/EnfermeroModels");
const RegistroMapper = require("../mappers/RegistroTratamientoMapper");

const getTratamientosActivos = async (id_admision) => {
  const evaluaciones = await EvaluacionMedica.findAll({
    where: { id_admision },
    include: [{
      model: Tratamiento,
      through: { attributes: [] }
    }],
    order: [['fecha', 'DESC']]
  });

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
  try {
    const entidad = RegistroMapper.toEntity(requestDTO);
    entidad.id_enfermero = requestDTO.id_enfermero; 
    await entidad.save();
    return true;
  } catch (error) {
    throw new Error("Error al guardar el registro: " + error.message);
  }
};

module.exports = {
  getTratamientosActivos,
  getHistorialRegistros,
  registrarEjecucion
};