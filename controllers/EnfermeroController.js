const EnfermeroService = require("../service/EnfermeroService");
const GuardiaService = require("../service/GuardiaService");
const { parseEnfermeroFromBody } = require("../helper/EnfermeroHelper");
const UsuarioService = require("../service/UsuarioService");

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
      id_rol: 2 
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
    const estado = req.body.estado === 'true';
    await EnfermeroService.changeStatusEnfermero( { id_enfermero, estado});

    res.redirect("/enfermeros/GestionEnfermero/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEnfermero,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
};
