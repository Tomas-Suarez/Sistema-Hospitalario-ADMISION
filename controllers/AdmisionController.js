// Importamos los servicios en donde se maneja la logica
const AdmisionService = require("../service/AdmisionService");
const AlaService = require("../service/AlaService");
const MotivoService = require("../service/MotivoAdmisionService");
const PacienteService = require("../service/PacienteService");
const TipoIngresoService = require("../service/TipoIngresoService");

// Controlador para obtener las admisiones, ala y habitacion
const getAllAdmisiones = async (req, res, next) => {
  try {
    // Obtenemos los datos de las admisiones
    const admisiones = await AdmisionService.getAllAdmisiones();
    // Obtenemos los datos de las alas
    const alas = await AlaService.getAllAlas();
    res.render("Internacion/InternacionPaciente", { admisiones, alas });
  } catch (error) {
    next(error);
  }
};

// Controlador para crear una admision
const createAdmision = async (req, res, next) => {
  try {
    const datos = {
      id_paciente: req.body.id_paciente,
      id_tipo: req.body.id_tipo,
      id_motivo: req.body.id_motivo,
      fecha_entrada: req.body.fechaInternar,
      detalles: req.body.detalles,
    };

    const { admision, creado } = await AdmisionService.createAdmision(datos);

    if (creado) {
      return res.redirect("/admisiones/InternacionPaciente/");
    }
  } catch (error) {
    const ingresos = await TipoIngresoService.getAllIngreso();
    const motivos = await MotivoService.getAllMotivos();
    const paciente = await PacienteService.getPacienteById(
      req.body.id_paciente
    );

    if (error.name === "InactivePatientException") {
      return res.status(409).render("Admision/RegistrarAdmision", {
        paciente,
        ingresos,
        motivos,
        pacienteInactivo: true,
        documento: req.body.documento,
        mensajeError: error.message,
      });
    }

    if (error.name === "DuplicatedResourceException") {
      return res.status(409).render("Admision/RegistrarAdmision", {
        paciente,
        ingresos,
        motivos,
        admisionActiva: true,
        documento: req.body.documento,
        mensajeError: error.message,
      });
    }

    next(error);
  }
};

// Controlador para cancelar una admision
const darDeBajaAdmision = async (req, res, next) => {
  try {
    await AdmisionService.darDeBajaAdmision(req.params.id);
    res.redirect("/admisiones/InternacionPaciente/");
  } catch (error) {
    next(error);
  }
};

const identificarPaciente = async (req, res, next) => {
  try {
    const { id_admision, dni_real } = req.body;

    const pacienteReal = await PacienteService.getPacienteByDNI(dni_real);

    await AdmisionService.cambiarPacienteDeAdmision(id_admision, pacienteReal.id_paciente);

    res.redirect("/asignaciones/GestionInternacion");

  } catch (error) {
    console.error("Error al identificar:", error.message);
    next(error); 
  }
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
  darDeBajaAdmision,
  identificarPaciente
};
