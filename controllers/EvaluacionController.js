const AsignacionService = require("../service/AsignacionDormitorioService");
const EvaluacionService = require("../service/EvaluacionMedicaService");
const AdmisionService = require("../service/AdmisionService");

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

module.exports = {
  getPacientesInternados,
  createEvaluacion,
};