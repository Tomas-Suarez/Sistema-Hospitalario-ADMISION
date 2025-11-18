const MedicoService = require("../service/MedicoService");
const UsuarioService = require("../service/UsuarioService");
const GuardiaService = require("../service/GuardiaService");
const EspecialidadService = require("../service/EspecialidadService");
const { parseMedicoFromBody } = require("../helper/MedicoHelper");

const getAllMedico = async (req, res, next) => {
  try {
    const medicos = await MedicoService.getAllMedicos();
    const guardias = await GuardiaService.getAllGuardia();
    const especialidades = await EspecialidadService.getAllEspecialidad();

    res.render("Medicos/GestionMedicos", { medicos, guardias, especialidades });
  } catch (error) {
    next(error);
  }
};

const createMedico = async (req, res, next) => {
  try {
    const datosUsuario = {
      nombre_usuario: req.body.nombre_usuario,
      password: req.body.password,
      email: req.body.email,
      id_rol: 1
    };
    
    const resultadoUsuario = await UsuarioService.createUsuario(datosUsuario);
    
    if (!resultadoUsuario.creado) {
        throw new Error("No se pudo crear el usuario para el médico.");
    }

    const datosMedico = parseMedicoFromBody(req.body);
    
    datosMedico.id_usuario = resultadoUsuario.usuario.id_usuario; 

    await MedicoService.createMedico(datosMedico);

    return res.redirect("/medicos/GestionMedico");
  } catch (error) {
    next(error);
  }
};

const updateMedico = async (req, res, next) => {
  try {
    const id_medico = parseInt(req.body.id_medico);
    const datos = parseMedicoFromBody(req.body, id_medico);
    await MedicoService.updateMedico(datos);

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    next(error);
  }
};

const changeStatusMedico = async (req, res, next) => {
  try {
    const id_medico = parseInt(req.body.id_medico);
    const estado = req.body.estado === 'true';
    await MedicoService.changeStatusMedico( { id_medico, estado });

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedico,
  createMedico,
  updateMedico,
  changeStatusMedico,
};
