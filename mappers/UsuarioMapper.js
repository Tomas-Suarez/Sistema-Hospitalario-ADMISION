const objectMapper = require("object-mapper");
const UsuarioResponseDTO = require("../dto/response/UsuarioResponseDTO");
const Usuario = require("../models/UsuarioModels");

const usuarioMap = {
  "id_usuario": "id_usuario",
  "nombre_usuario": "nombre_usuario",
  "email": "email",
  "rol.nombre": "rol.nombre"
};

function toEntity(usuarioRequestDTO) {
  return Usuario.build({
    nombre_usuario: usuarioRequestDTO.nombre_usuario,
    password_hash: usuarioRequestDTO.password,
    email: usuarioRequestDTO.email,
    id_rol: usuarioRequestDTO.id_rol,
  });
}

function toDto(usuarioEntity) {
  if (!usuarioEntity) return null;

  const plainUsuario = usuarioEntity.toJSON ? usuarioEntity.toJSON() : usuarioEntity;

  const dtoObj = objectMapper(plainUsuario, usuarioMap);

  return new UsuarioResponseDTO(
    dtoObj.id_usuario,
    dtoObj.nombre_usuario,
    dtoObj.email,
    { nombre: dtoObj.rol?.nombre }
  );
}

module.exports = {
  toEntity,
  toDto,
};
