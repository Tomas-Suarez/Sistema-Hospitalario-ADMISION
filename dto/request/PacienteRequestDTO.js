class PacienteRequestDTO {
  constructor({
    nombre,
    apellido,
    documento,
    telefono,
    fecha_nacimiento,
    domicilio,
    genero,
    estatura,
    peso,
    estado,
    id_seguro,
  }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.domicilio = domicilio;
    this.genero = genero;
    this.estatura = estatura;
    this.peso = peso;
    this.estado = estado;
    this.id_seguro = id_seguro;
  }
}

module.exports = PacienteRequestDTO;
