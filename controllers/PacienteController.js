const pacienteService = require("../service/PacienteService");
const SeguroService = require("../service/SeguroMedicoService");
const IngresoService = require("../service/TipoIngresoService");
const MotivoService = require("../service/MotivoAdmisionService");
const AlaService = require("../service/AlaService");
const HabitacionService = require("../service/HabitacionService");
const { parsePacienteFromBody } = require("../helper/PacienteHelper");
const { HABITACION_EMERGENCIA } = require("../constants/HabitacionConstants");

// Controlador para obtener los pacientes con sus respectivos seguros medicos.
const getAllPacientes = async (req, res, next) => {
  try {
    const pacientes = await pacienteService.getAllPacientes();
    const seguros = await SeguroService.getAllSegurosMedicos();

    res.render("Paciente/GestionPaciente", { pacientes, seguros });
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener todos los pacientes activos, incluyendo los ingresos, motivos, alas 
const formAdmision = async (req, res, next) => {
  try {
    // Obtenemos los datos para el formulario de admision
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    // Renderizamos en la vista, con los datos obtenidos
    res.render("Admision/RegistrarAdmision", {
      ingresos,
      motivos,
      alas,
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para crear un nuevo paciente a partir de los datos recibidos por el formulario (req.body)
const createPaciente = async (req, res, next) => {
  try {
    const datos = parsePacienteFromBody(req.body);
    await pacienteService.createPaciente(datos);
    return res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar un paciente existente con los datos del formulario
const updatePaciente = async (req, res, next) => {
  try {
    // Obtenemos el id del paciente a traves de los parametros de ruta
    const id_paciente = parseInt(req.params.id);
    const datos = parsePacienteFromBody(req.body, id_paciente);
    await pacienteService.updatePaciente(datos);

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    next(error);
  }
};

// Controlador para cambiar el estado del paciente
const changeStatusPaciente = async (req, res, next) => {
  try {
    const id_paciente = parseInt(req.params.id);
    const estado = req.body.estado === 'true';
    await pacienteService.changeStatusPaciente({ id_paciente, estado });

    res.redirect("/pacientes/GestionPaciente");
  } catch (error) {
    next(error);
  }
};

// Controlador para el form de admision, donde cargamos el paciente por el dni
const cargarPaciente = async (req, res, next) => {
  try {
    const documento = req.query.documento;

    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();

    let paciente = null;

    try {
      paciente = await pacienteService.getPacienteByDNI(documento);
    } catch (error) {

      if (error.name === "ResourceNotFoundException") {
        return res.status(404).render("Admision/RegistrarAdmision", {
          error: "Paciente no encontrado!",
          documento,
          ingresos,
          motivos,
          alas,
        });
      }
      return next(error);
    }

    res.render("Admision/RegistrarAdmision", {
      paciente,
      documento,
      ingresos,
      motivos,
      alas,
    });

  } catch (error) {
    next(error);
  }
};

// Controlador para el form de emergencia, cuando tenemos un paciente NN
const formEmergencia = async (req, res, next) => {
  try {
    const ingresos = await IngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const alas = await AlaService.getAllAlas();
    const habitaciones = await HabitacionService.getHabitacionesEmergencia(HABITACION_EMERGENCIA);

    res.render("Emergencia/RegistrarEmergencia", {
      ingresos,
      motivos,
      alas,
      habitaciones,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPacientes,
  formAdmision,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
  cargarPaciente,
  formEmergencia,
};
