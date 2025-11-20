const AsignacionService = require("../service/AsignacionDormitorioService");
const EvaluacionService = require("../service/EvaluacionMedicaService");
const AdmisionService = require("../service/AdmisionService");
const TratamientoService = require("../service/TratamientoService");
const MedicoService = require("../service/MedicoService");

const getPacientesInternados = async (req, res, next) => {
  try {
    const internaciones = await AsignacionService.getAsignacionesActuales();

    res.render("Medicos/SeleccionarPaciente", { internaciones });
  } catch (error) {
    next(error);
  }
};

const createEvaluacion = async (req, res, next) => {
  try {

    const medico = await MedicoService.getMedicoByUsuarioId(req.user.id_usuario);

    const datos = {
      id_medico: medico.id_medico,
      id_admision: parseInt(req.body.id_admision),
      id_tratamiento: parseInt(req.body.id_tratamiento),
      observaciones: req.body.observaciones
    };

    await EvaluacionService.createEvaluacion(datos);

    res.redirect("/evaluaciones/pacientes");
    
  } catch (error) {
    next(error);
  }
};

const getFormularioEvaluacion = async (req, res, next) => {
  try {
    const { id_admision } = req.params;

    const admision = await AdmisionService.getAdmisionById(id_admision);

    const historial = await EvaluacionService.getEvaluacionesPorAdmision(id_admision);

    const tratamientos = await TratamientoService.getAllTratamientos();

    res.render("Medicos/CargarEvaluacion", { 
      admision, 
      historial, 
      tratamientos 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPacientesInternados,
  createEvaluacion,
  getFormularioEvaluacion,
};