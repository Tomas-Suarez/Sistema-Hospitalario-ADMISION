const UsuarioService = require("../service/UsuarioService");
const Rol = require("../models/RolModels");
const Usuario = require("../models/UsuarioModels");
const {
  EMAIL_EXISTENTE,
  CREDENCIALES_INVALIDAS,
} = require("../constants/UsuarioConstants");

const getRegistroUsuario = async (req, res, next) => {
  try {
    const roles = await Rol.findAll({
      attributes: ["id_rol", "nombre"],
    });

    res.render("Usuario/RegistrarUsuario", { roles });
  } catch (error) {
    next(error);
  }
};

const createUsuario = async (req, res, next) => {
  try {
    const datos = {
      nombre_usuario: req.body.nombre_usuario,
      password: req.body.password,
      email: req.body.email,
      id_rol: parseInt(req.body.id_rol),
    };

    const { usuario, creado } = await UsuarioService.createUsuario(datos);

    if (creado) {
      return res.redirect("/");
    }
  } catch (error) {
    const roles = await Rol.findAll({
      attributes: ["id_rol", "nombre"],
    });

    if (error.name === "DuplicatedResourceException") {
      return res.status(409).render("Usuario/RegistrarUsuario", {
        roles,
        mensajeError: EMAIL_EXISTENTE,
      });
    }
    next(error);
  }
};

const getLogin = async (req, res, next) => {
  try {
    res.render("Usuario/LoginUsuario", {
      mensajeError: null,
    });
  } catch (error) {
    next(error);
  }
};

const loginUsuario = async (req, res, next) => {
  try {
    const { credencial, password } = req.body;

    const { usuario, token } = await UsuarioService.loginUsuario(
      credencial,
      password
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });

    return res.redirect("/");
    
  } catch (error) {
    if (error.name === "InvalidCredentialsException") {
      return res.status(401).render("Usuario/LoginUsuario", {
        mensajeError: error.message,
      });
    }
    next(error);
  }
};

const getAllRecepcionistas = async (req, res, next) => {
  try {
    const recepcionistas = await Usuario.findAll({
      include: {
        model: Rol,
        as: "rol",
        where: { nombre: "Recepcionista" }
      }
    });

    res.render("Recepcionistas/GestionRecepcionistas", { recepcionistas });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUsuario,
  loginUsuario,
  getRegistroUsuario,
  getLogin,
  getAllRecepcionistas
};
