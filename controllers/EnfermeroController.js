const EnfermeroService = require("../service/EnfermeroService");
const GuardiaService = require("../service/GuardiaService");
const { parseEnfermeroFromBody } = require("../helper/EnfermeroHelper");
const UsuarioService = require("../service/UsuarioService");
const AlergiaService = require("../service/AlergiaService");
const AntecedenteService = require("../service/AntecendeteService");
const PacienteService = require("../service/PacienteService");
const { parseHistoriaFromBody } = require("../helper/HistoriaClinicaHelper");
const AsignacionService = require("../service/AsignacionDormitorioService");
const SignosService = require("../service/SignosVitalesService");
const AdmisionService = require("../service/AdmisionService");
const { parseSignosFromBody } = require("../helper/SignosVitalesHelper");


const getVistaHistoria = (req, res) => {
  res.render("Enfermeros/RegistrarHistoria", {
    documento: "",
    error: null,
    paciente: null,
  });
};

const getPacientesInternados = async (req, res, next) => {
  try {
    const internaciones = await AsignacionService.getAsignacionesActuales();

    res.render("Enfermeros/SeleccionarPaciente", { internaciones });
  } catch (error) {
    next(error);
  }
};

const getAllEnfermero = async (req, res, next) => {
  try {
    const enfermeros = await EnfermeroService.getAllEnfermeros();
    const guardias = await GuardiaService.getAllGuardia();
    res.render("Enfermeros/GestionEnfermeros", { enfermeros, guardias });
  } catch (error) {
    next(error);
  }
};

const createEnfermero = async (req, res, next) => {
  try {
    const datosUsuario = {
      nombre_usuario: req.body.nombre_usuario,
      email: req.body.email,
      password: req.body.password,
      id_rol: 2,
    };

    const resultadoUsuario = await UsuarioService.createUsuario(datosUsuario);

    if (!resultadoUsuario.creado) {
      throw new Error("No se pudo crear el usuario para el enfermero.");
    }

    const datosEnfermero = parseEnfermeroFromBody(req.body);

    datosEnfermero.id_usuario = resultadoUsuario.usuario.id_usuario;
    await EnfermeroService.createEnfermero(datosEnfermero);

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    next(error);
  }
};

const updateEnfermero = async (req, res) => {
  try {
    const id_enfermero = parseInt(req.body.id_enfermero);
    const datos = parseEnfermeroFromBody(req.body, id_enfermero);
    await EnfermeroService.updateEnfermero(datos);

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    next(error);
  }
};

const changeStatusEnfermero = async (req, res, next) => {
  try {
    const id_enfermero = parseInt(req.body.id_enfermero);
    const estado = req.body.estado === "true";
    await EnfermeroService.changeStatusEnfermero({ id_enfermero, estado });

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    next(error);
  }
};

const buscarPacienteHistoria = async (req, res) => {
  const { documento } = req.query;
  try {
    const paciente = await PacienteService.getPacienteByDNI(documento);
    const alergiasDisponibles = await AlergiaService.getAllAlergia();
    const antecedentesDisponibles =
    await AntecedenteService.getAllAntecedente();

    const alergiasSel = paciente.alergias.map((a) => a.id_alergia);
    const antecedentesSel = paciente.antecedentes.map((a) => a.id_antecedente);

    res.render("Enfermeros/RegistrarHistoria", {
      documento,
      paciente,
      alergiasDisponibles,
      antecedentesDisponibles,
      alergiasSel,
      antecedentesSel,
    });
  } catch (e) {
    res.render("Enfermeros/RegistrarHistoria", {
      documento,
      error: "Paciente no encontrado",
      paciente: null,
    });
  }
};

const guardarHistoria = async (req, res, next) => {
  try {
    const datos = parseHistoriaFromBody(req.body);
    await PacienteService.updateHistoriaClinica(datos.id_paciente, datos);
    res.redirect(`/enfermeros/historia/buscar?documento=${datos.documento}`);
  } catch (error) {
    next(error);
  }
};

const getVistaSignos = async (req, res, next) => {
  try {
    const { id_admision } = req.params;

    const admision = await AdmisionService.getAdmisionById(id_admision);
    
    const historial = await SignosService.getHistorialPorAdmision(id_admision);

    res.render("Enfermeros/CargarSignos", { 
      admision, 
      historial 
    });
  } catch (error) {
    next(error);
  }
};

const getDetalleSignos = async (req, res, next) => {
  try {
    const { id_signo } = req.params;
    const signo = await SignosService.getSignoVitalById(id_signo);

    res.render("Enfermeros/DetalleSignos", { 
      signo
    });
  } catch (error) {
    next(error);
  }
};

const createSignosVitales = async (req, res, next) => {
  try {
    const enfermero = await EnfermeroService.getEnfermeroByUsuarioId(req.user.id_usuario);

    const datos = parseSignosFromBody(req.body, enfermero.id_enfermero);

    await SignosService.createSignosVitales(datos);

    res.redirect(`/enfermeros/signos/${datos.id_admision}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEnfermero,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
  buscarPacienteHistoria,
  getVistaHistoria,
  guardarHistoria,
  getPacientesInternados,
  getVistaSignos,
  createSignosVitales,
  getDetalleSignos
};
