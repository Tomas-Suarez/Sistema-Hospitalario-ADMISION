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
  try {
    const evaluacion = await EvaluacionMedica.create({
        id_medico: datos.id_medico,
        id_admision: datos.id_admision,
        observaciones: datos.observaciones,
        fecha: new Date()
    });

    if (datos.tratamientos && datos.tratamientos.length > 0) {
        await evaluacion.addTratamientos(datos.tratamientos);
    }

if (datos.pruebas && datos.pruebas.length > 0) {
        const solicitudes = datos.pruebas.map(id_tipo => ({
            id_admision: datos.id_admision,
            id_medico: datos.id_medico,
            id_evaluacion_medica: evaluacion.id_evaluacion_medica,
            id_tipo_prueba: parseInt(id_tipo),
            fecha_solicitud: new Date()
        }));
        
        await SolicitudPrueba.bulkCreate(solicitudes);
    }

    return EvaluacionMapper.toDto(evaluacion);
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
        },
        {
           model: SolicitudPrueba,
           include: [{ model: TipoPrueba, attributes: ['nombre'] }]
        }
      ],
      order: [['fecha', 'DESC']]
    });
    
    return evaluaciones.map(ev => EvaluacionMapper.toDto(ev));
  } catch (error) {
    throw new Error("Error al buscar evaluaciones: " + error.message);
  }
};

const getEvaluacionById = async (id_evaluacion_medica) => {
  try {
    const evaluacion = await EvaluacionMedica.findByPk(id_evaluacion_medica, {
      include: [
        { model: Medico, attributes: ['nombre', 'apellido', 'matricula'] },
        { 
          model: Tratamiento, 
          attributes: ['nombre', 'descripcion', 'duracion', 'indicaciones'],
          through: { attributes: [] }
        },
        { 
            model: SolicitudPrueba,
            include: [{ model: TipoPrueba, attributes: ['nombre'] }] 
        }
      ]
    });

    if (!evaluacion) {
      throw new Error("Evaluación no encontrada");
    }

    return EvaluacionMapper.toDto(evaluacion);
  } catch (error) {
    throw new Error("Error al obtener el detalle: " + error.message);
  }
};

module.exports = {
  createEvaluacion,
  getEvaluacionesPorAdmision,
  getEvaluacionById,
};
