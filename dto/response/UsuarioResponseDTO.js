class UsuarioResponseDTO {
  constructor(id_usuario, nombre_usuario, email, rol) {
    this.id_usuario = id_usuario;
    this.nombre_usuario = nombre_usuario;
    this.email = email;
    this.nombre_rol = rol?.nombre;
  }
}
module.exports = UsuarioResponseDTO;