const Usuario = require("../models/UsuarioModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioMapper = require("../mappers/UsuarioMapper");
const { Op } = require("sequelize");

const DuplicatedResourceException = require("../exceptions/DuplicatedResourceException");
const InvalidCredentialsException = require("../exceptions/InvalidCredentialsException");

const {
  EMAIL_EXISTENTE,
  SALT_ROUNDS,
  CREDENCIALES_INVALIDAS,
} = require("../constants/UsuarioConstants");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createUsuario = async (usuarioDTO) => {
  const existe = await Usuario.findOne({ where: { email: usuarioDTO.email } });
  if (existe) {
    throw new DuplicatedResourceException(EMAIL_EXISTENTE);
  }

  const usuarioEntity = UsuarioMapper.toEntity(usuarioDTO);

  usuarioEntity.password_hash = await bcrypt.hash(usuarioDTO.password, SALT_ROUNDS);

  const usuario = await usuarioEntity.save();

  return {
    usuario: UsuarioMapper.toDto(usuario),
    creado: true,
  };
};

// Login de usuario
const loginUsuario = async (credencial, password) => {

  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: [{ email: credencial }, { nombre_usuario: credencial }],
    },
    include: ["Rol"],
  });

  if (!usuario) {
    throw new InvalidCredentialsException(CREDENCIALES_INVALIDAS);
  }

  // Verificamos la contraseña
  const valido = await bcrypt.compare(password, usuario.password_hash);
  if (!valido) {
    throw new InvalidCredentialsException(CREDENCIALES_INVALIDAS);
  }

  const payload = {
    id_usuario: usuario.id_usuario,
    nombre_usuario: usuario.nombre_usuario,
    email: usuario.email,
    rol: usuario.Rol?.nombre || null,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    usuario: UsuarioMapper.toDto(usuario),
    token,
  };
};

module.exports = {
  createUsuario,
  loginUsuario,
};
