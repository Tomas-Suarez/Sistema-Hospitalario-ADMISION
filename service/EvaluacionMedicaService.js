const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Medico = require("../models/MedicoModels");
const Tratamiento = require("../models/TratamientoModels");
const EvaluacionMapper = require("../mappers/EvaluacionMedicaMapper");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const {
  EVALUACION_NO_ENCONTRADO_POR_ID,
} = require("../constants/EvaluacionMedicaConstants");

const createEvaluacion = async (evaluacionRequestDTO) => {
  try {
    const { tratamientos, ...datosEvaluacion } = evaluacionRequestDTO;

    const nuevaEvaluacion = await EvaluacionMedica.create({
      id_medico: datosEvaluacion.id_medico,
      id_admision: datosEvaluacion.id_admision,
      observaciones: datosEvaluacion.observaciones,
      fecha: new Date(),
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
        { model: Medico, attributes: ["apellido"] },
        {
          model: Tratamiento,
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
      order: [["fecha", "DESC"]],
    });

    return evaluaciones.map((ev) => EvaluacionMapper.toDto(ev));
  } catch (error) {
    throw new Error("Error al buscar evaluaciones: " + error.message);
  }
};

const getEvaluacionById = async (id_evaluacion_medica) => {
  const evaluacion = await EvaluacionMedica.findByPk(id_evaluacion_medica, {
    include: [
      { model: Medico, attributes: ["nombre", "apellido", "matricula"] },
      {
        model: Tratamiento,
        attributes: ["nombre", "descripcion", "duracion", "indicaciones"],
        through: { attributes: [] },
      },
    ],
  });

  if(!evaluacion){
    throw new ResourceNotFoundException(EVALUACION_NO_ENCONTRADO_POR_ID + id_evaluacion_medica);
  }
  return EvaluacionMapper.toDto(evaluacion);

};

module.exports = {
  createEvaluacion,
  getEvaluacionesPorAdmision,
  getEvaluacionById,
};
