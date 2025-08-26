class HabitacionResponsetDTO {
  constructor({
    id_habitacion,
    ala,
    numero,
    capacidad,
  }) {
    this.id_habitacion = id_habitacion;
    this.nombre_ala = ala?.nombre || null;
    this.numero = numero;
    this.capacidad = capacidad;
  }
}

module.exports = HabitacionResponsetDTO;