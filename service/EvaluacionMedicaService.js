const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Medico = require("../models/MedicoModels");
const Tratamiento = require("../models/TratamientoModels");
const EvaluacionMapper = require("../mappers/EvaluacionMedicaMapper");

const createEvaluacion = async (evaluacionRequestDTO) => {
  try {
    const evaluacionEntity = EvaluacionMapper.toEntity(evaluacionRequestDTO);
    const nuevaEvaluacion = await evaluacionEntity.save();
    return EvaluacionMapper.toDto(nuevaEvaluacion);
  } catch (error) {
    throw new Error("Error al guardar la evaluación médica: " + error.message);
  }
};

const getEvaluacionesPorAdmision = async (id_admision) => {
  try {
    const evaluaciones = await EvaluacionMedica.findAll({
      where: { id_admision },
      include: [
        { model: Medico, attributes: ['apellido'] },
        { model: Tratamiento, attributes: ['nombre'] }
      ],
      order: [['fecha', 'DESC']]
    });
    
    return evaluaciones.map(ev => EvaluacionMapper.toDto(ev));
  } catch (error) {
    throw new Error("Error al buscar evaluaciones: " + error.message);
  }
};

module.exports = {
  createEvaluacion,
  getEvaluacionesPorAdmision,
};