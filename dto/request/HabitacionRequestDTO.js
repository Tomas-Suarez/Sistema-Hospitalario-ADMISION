class HabitacionRequestDTO {
  constructor({
    id_habitacion,
    id_ala,
    numero,
    capacidad,
  }) {
    this.id_habitacion = id_habitacion;
    this.id_ala = id_ala;
    this.numero = numero;
    this.capacidad = capacidad;
  }
}

module.exports = HabitacionRequestDTO;