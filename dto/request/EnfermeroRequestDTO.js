class EnfermeroRequestDTO {
  constructor({
    id_enfermero,
    nombre,
    apellido,
    documento,
    genero,
    matricula,
    estado,
    id_guardia,
  }) {
    this.id_enfermero = id_enfermero;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.genero = genero;
    this.matricula = matricula;
    this.peso = peso;
    this.estado = estado;
    this.id_guardia = id_guardia;
  }
}

module.exports = EnfermeroRequestDTO;