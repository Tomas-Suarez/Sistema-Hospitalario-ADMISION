const RegistroTratamiento = require("../models/RegistroTratamientoModels");
const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Tratamiento = require("../models/TratamientoModels");
const Enfermero = require("../models/EnfermeroModels");
const RegistroMapper = require("../mappers/RegistroTratamientoMapper");

const getPlanDeCuidados = async (id_admision) => {
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
  const tratamientosIndicados = Array.from(tratamientosMap.values());

  const registrosPrevios = await RegistroTratamiento.findAll({
    where: { id_admision },
    include: [
      { model: Tratamiento },
      { model: Enfermero }
    ],
    order: [['fecha_realizacion', 'DESC']]
  });

  const historial = registrosPrevios.map(r => RegistroMapper.toDto(r));

  return {
    tratamientosIndicados,
    historial
  };
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
  getPlanDeCuidados,
  registrarEjecucion
};