const SignosVitales = require("../models/SignosVitalesModels");
const Enfermero = require("../models/EnfermeroModels");
const Paciente = require("../models/PacienteModels");
const SignosMapper = require("../mappers/SignosVitalesMapper");
const Admision = require("../models/AdmisionModels");

const createSignosVitales = async (requestDTO) => {
  try {
    const signosEntity = SignosMapper.toEntity(requestDTO);
    signosEntity.id_enfermero = requestDTO.id_enfermero; 
    
    const nuevoRegistro = await signosEntity.save();
    return SignosMapper.toDto(nuevoRegistro);
    
  } catch (error) {
    throw new Error("Error al registrar signos vitales: " + error.message);
  }
};

const getHistorialPorAdmision = async (id_admision) => {
  try {
    const historial = await SignosVitales.findAll({
      where: { id_admision },
      include: [
        { model: Enfermero, attributes: ["nombre", "apellido", "matricula"] }
      ],
      order: [['fecha_registro', 'DESC']]
    });

    return historial.map(h => SignosMapper.toDto(h));
  } catch (error) {
    throw new Error("Error al obtener historial de signos: " + error.message);
  }
};

const getSignoVitalById = async (id_signo_vital) => {
  try {
    const signo = await SignosVitales.findByPk(id_signo_vital, {
      include: [
        { model: Enfermero, attributes: ["nombre", "apellido", "matricula"] },
        { 
            model: Admision, 
            include: [{ model: Paciente }]
        }
      ]
    });

    if (!signo) throw new Error("Registro no encontrado");
    
    return SignosMapper.toDto(signo);
  } catch (error) {
    throw new Error("Error al obtener el detalle del signo vital: " + error.message);
  }
};

module.exports = {
  createSignosVitales,
  getHistorialPorAdmision,
  getSignoVitalById
};