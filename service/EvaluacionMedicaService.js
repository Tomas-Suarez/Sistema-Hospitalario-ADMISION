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

module.exports = {
  createEvaluacion
};