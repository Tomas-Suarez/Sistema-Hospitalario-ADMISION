class GuardiaResponseDTO {
  constructor({
    id_guardia,
    nombre,
    hora_inicio,
    hora_fin,
  }) {
    this.id_guardia = id_guardia;
    this.nombre = nombre;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
  }
}

module.exports = GuardiaResponseDTO;
