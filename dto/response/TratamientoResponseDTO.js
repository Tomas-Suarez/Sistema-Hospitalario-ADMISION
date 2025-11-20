class TratamientoResponseDTO {
  constructor({ id_tratamiento, nombre, descripcion, duracion, indicaciones }) {
    this.id_tratamiento = id_tratamiento;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.duracion = duracion;
    this.indicaciones = indicaciones;
  }
}

module.exports = TratamientoResponseDTO;