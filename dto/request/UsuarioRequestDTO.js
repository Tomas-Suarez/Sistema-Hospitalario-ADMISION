class UsuarioRequestDTO {
  constructor(nombre_usuario, password, email, id_rol) {
    this.nombre_usuario = nombre_usuario;
    this.password = password;
    this.email = email;
    this.id_rol = id_rol;
  }
}
module.exports = UsuarioRequestDTO;