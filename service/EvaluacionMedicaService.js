const sequelize = require("../models/db");

const EvaluacionMedica = require("../models/EvaluacionMedicaModels");
const Medico = require("../models/MedicoModels");
const Tratamiento = require("../models/TratamientoModels");
const SolicitudPrueba = require("../models/SolicitudPruebaModels");
const TipoPrueba = require("../models/TipoPruebaModels");

const EvaluacionMapper = require("../mappers/EvaluacionMedicaMapper");

const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");

const {
  EVALUACION_NO_ENCONTRADO_POR_ID,
} = require("../constants/EvaluacionMedicaConstants");

const createEvaluacion = async (datos) => {
  const nuevaEvaluacion = await sequelize.transaction(async (t) => {
    
    const evaluacion = await EvaluacionMedica.create({
      id_medico: datos.id_medico,
      id_admision: datos.id_admision,
      observaciones: datos.observaciones,
      fecha: new Date(),
    }, { transaction: t });

    if (datos.tratamientos && datos.tratamientos.length > 0) {
      await evaluacion.addTratamientos(datos.tratamientos, { transaction: t });
    }

    if (datos.pruebas && datos.pruebas.length > 0) {
      const solicitudes = datos.pruebas.map((id_tipo) => ({
        id_admision: datos.id_admision,
        id_medico: datos.id_medico,
        id_evaluacion_medica: evaluacion.id_evaluacion_medica,
        id_tipo_prueba: parseInt(id_tipo),
        fecha_solicitud: new Date(),
      }));

      await SolicitudPrueba.bulkCreate(solicitudes, { transaction: t });
    }

    return evaluacion;
  });

  return EvaluacionMapper.toDto(nuevaEvaluacion);
};

const getEvaluacionesPorAdmision = async (id_admision) => {
  const evaluaciones = await EvaluacionMedica.findAll({
    where: { id_admision },
    include: [
      { 
        model: Medico, 
        attributes: ["apellido"] 
      },
      {
        model: Tratamiento,
        attributes: ["nombre"],
        through: { attributes: [] },
      },
      {
        model: SolicitudPrueba,
        include: [{ model: TipoPrueba, attributes: ["nombre"] }],
      },
    ],
    order: [["fecha", "DESC"]],
  });

  return evaluaciones.map((ev) => EvaluacionMapper.toDto(ev));
};

const getEvaluacionById = async (id_evaluacion_medica) => {
  const evaluacion = await EvaluacionMedica.findByPk(id_evaluacion_medica, {
    include: [
      { 
        model: Medico, 
        attributes: ["nombre", "apellido", "matricula"] 
      },
      {
        model: Tratamiento,
        attributes: ["nombre", "descripcion", "duracion", "indicaciones"],
        through: { attributes: [] },
      },
      {
        model: SolicitudPrueba,
        include: [{ model: TipoPrueba, attributes: ["nombre"] }],
      },
    ],
  });

  if (!evaluacion) {
    throw new ResourceNotFoundException(
      EVALUACION_NO_ENCONTRADO_POR_ID + id_evaluacion_medica
    );
  }

  return EvaluacionMapper.toDto(evaluacion);
};

module.exports = {
  createEvaluacion,
  getEvaluacionesPorAdmision,
  getEvaluacionById,
};