const AdmisionService = require("../service/AdmisionService");
const AltaService = require("../service/AltaService");
const PacienteService = require("../service/PacienteService");
const MotivoAlta = require("../models/MotivoAltaModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");
const Habitacion = require("../models/HabitacionModels");

const getVistaAlta = (req, res) => {
  res.render("Medicos/AltaPaciente", { 
    documento: "", 
    error: null, 
    admision: null 
  });
};

const buscarPacienteParaAlta = async (req, res, next) => {
  const { documento } = req.query;

  try {
    let paciente = null;
    try {
      paciente = await PacienteService.getPacienteByDNI(documento);
    } catch (e) {
      return res.render("Medicos/AltaPaciente", {
        documento,
        error: "No existe ningún paciente registrado con ese DNI.",
        admision: null
      });
    }

    const admision = await AdmisionService.getAdmisionActivaByPaciente(paciente.id_paciente);

    if (!admision) {
      return res.render("Medicos/AltaPaciente", {
        documento,
        error: "El paciente existe, pero NO está internado actualmente.",
        admision: null
      });
    }

    const asignacion = await AsignacionDormitorio.findOne({
        where: { id_admision: admision.id_admision, fecha_fin: null },
        include: [{ 
            model: Cama, 
            include: [Habitacion] 
        }]
    });

    if (asignacion && asignacion.Cama && asignacion.Cama.Habitacion) {
        admision.habitacion = asignacion.Cama.Habitacion; 
    }

    const motivos = await MotivoAlta.findAll();

    res.render("Medicos/AltaPaciente", {
      documento,
      error: null,
      admision,
      motivos
    });

  } catch (error) {
    next(error);
  }
};

const procesarAlta = async (req, res, next) => {
  try {
    await AltaService.procesarAlta(req.body);
    res.redirect("/evaluaciones/pacientes");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVistaAlta,
  buscarPacienteParaAlta,
  procesarAlta
};