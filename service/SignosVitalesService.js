const SignosVitales = require("../models/SignosVitalesModels");
const Enfermero = require("../models/EnfermeroModels");
const Paciente = require("../models/PacienteModels");
const Admision = require("../models/AdmisionModels");
const SignosMapper = require("../mappers/SignosVitalesMapper");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const { ADMISION_NO_ENCONTRADA_POR_ID } = require("../constants/AdmisionConstants");
const { SIGNO_NO_ENCONTRADO } = require("../constants/EnfermeroConstants");

const createSignosVitales = async (requestDTO) => {
  const admision = await Admision.findByPk(requestDTO.id_admision);
  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  const signosEntity = SignosMapper.toEntity(requestDTO);
  
  signosEntity.id_enfermero = requestDTO.id_enfermero; 
  
  const nuevoRegistro = await signosEntity.save();
  return SignosMapper.toDto(nuevoRegistro);
};

const getHistorialPorAdmision = async (id_admision) => {
  const admision = await Admision.findByPk(id_admision);

  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  const historial = await SignosVitales.findAll({
    where: { id_admision },
    include: [
      { model: Enfermero, attributes: ["nombre", "apellido", "matricula"] }
    ],
    order: [['fecha_registro', 'DESC']]
  });

  return historial.map(h => SignosMapper.toDto(h));
};

const getSignoVitalById = async (id_signo_vital) => {
  const signo = await SignosVitales.findByPk(id_signo_vital, {
    include: [
      { model: Enfermero, attributes: ["nombre", "apellido", "matricula"] },
      { 
          model: Admision, 
          include: [{ model: Paciente }]
      }
    ]
  });

  if (!signo) {
    throw new ResourceNotFoundException(SIGNO_NO_ENCONTRADO);
  }
  
  return SignosMapper.toDto(signo);
};

module.exports = {
  createSignosVitales,
  getHistorialPorAdmision,
  getSignoVitalById
};