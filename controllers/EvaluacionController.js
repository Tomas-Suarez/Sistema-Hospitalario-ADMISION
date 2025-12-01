const AsignacionService = require("../service/AsignacionDormitorioService");
const EvaluacionService = require("../service/EvaluacionMedicaService");
const AdmisionService = require("../service/AdmisionService");
const TratamientoService = require("../service/TratamientoService");
const MedicoService = require("../service/MedicoService");
const TipoPruebaService = require("../service/TipoPruebaService");

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
    const medico = await MedicoService.getMedicoByUsuarioId(
      req.user.id_usuario
    );

    let tratamientos = req.body.tratamientos;
    if (tratamientos && !Array.isArray(tratamientos)) {
      tratamientos = [tratamientos];
    }

    let pruebas = req.body.pruebas;
    if (pruebas && !Array.isArray(pruebas)) {
      pruebas = [pruebas];
    }

    const datos = {
      id_medico: medico.id_medico,
      id_admision: parseInt(req.body.id_admision),
      tratamientos: tratamientos || [],
      pruebas: pruebas || [],
      observaciones: req.body.observaciones,
    };

    await EvaluacionService.createEvaluacion(datos);

    res.redirect(`/evaluaciones/crear/${datos.id_admision}`);
  } catch (error) {
    next(error);
  }
};

const getFormularioEvaluacion = async (req, res, next) => {
  try {
    const { id_admision } = req.params;

    const admision = await AdmisionService.getAdmisionById(id_admision);

    const historial = await EvaluacionService.getEvaluacionesPorAdmision(
      id_admision
    );

    const tratamientos = await TratamientoService.getAllTratamientos();
    const pruebas = await TipoPruebaService.getAllPruebas();

    res.render("Medicos/CargarEvaluacion", {
      admision,
      historial,
      tratamientos,
      pruebas,
    });
  } catch (error) {
    next(error);
  }
};

const getDetalleEvaluacion = async (req, res, next) => {
  try {
    const { id_evaluacion } = req.params;

    const evaluacion = await EvaluacionService.getEvaluacionById(id_evaluacion);

    const admision = await AdmisionService.getAdmisionById(
      evaluacion.id_admision
    );

    res.render("Medicos/DetalleEvaluacion", {
      evaluacion,
      admision,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPacientesInternados,
  createEvaluacion,
  getFormularioEvaluacion,
  getDetalleEvaluacion,
};
