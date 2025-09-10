class MedicoRequestDTO {
  constructor({
    id_medico,
    nombre,
    apellido,
    documento,
    telefono,
    genero,
    matricula,
    estado,
    id_especialidad,
    id_guardia,
  }) {
    this.id_medico = id_medico;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.telefono = telefono;
    this.genero = genero;
    this.matricula = matricula;
    this.peso = peso;
    this.estado = estado;
    this.id_especialidad = id_especialidad;
    this.id_guardia = id_guardia;
  }
}

module.exports = MedicoRequestDTO;