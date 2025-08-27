class HabitacionResponseDTO {
  constructor({ id_habitacion, numero, capacidad, ala }) {
    this.id_habitacion = id_habitacion;
    this.numero = numero;
    this.capacidad = capacidad || null;

    this.ala = ala?.nombre
      ? { nombre: ala.nombre }
      : { nombre: "Sin asignar" };
  }
}

module.exports = HabitacionResponseDTO;
