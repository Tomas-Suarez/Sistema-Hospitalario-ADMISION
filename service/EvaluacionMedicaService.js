const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Medico = require("../models/MedicoModels");
const Tratamiento = require("../models/TratamientoModels");
const EvaluacionMapper = require("../mappers/EvaluacionMedicaMapper");

const createEvaluacion = async (evaluacionRequestDTO) => {
  try {
    const { tratamientos, ...datosEvaluacion } = evaluacionRequestDTO;

    const nuevaEvaluacion = await EvaluacionMedica.create({
        id_medico: datosEvaluacion.id_medico,
        id_admision: datosEvaluacion.id_admision,
        observaciones: datosEvaluacion.observaciones,
        fecha: new Date()
    });

    if (tratamientos && tratamientos.length > 0) {
        await nuevaEvaluacion.addTratamientos(tratamientos);
    }

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
        { 
          model: Tratamiento, 
          attributes: ['nombre'],
          through: { attributes: [] }
        }
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