class RegistroTratamientoRequestDTO {
  constructor({
    id_admision,
    id_tratamiento,
    observaciones
  }) {
    this.id_admision = parseInt(id_admision);
    this.id_tratamiento = parseInt(id_tratamiento);
    this.observaciones = observaciones ? observaciones.trim() : null;
  }
}

module.exports = RegistroTratamientoRequestDTO;