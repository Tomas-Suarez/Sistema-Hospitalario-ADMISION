class SolicitudPruebaResponseDTO {
  constructor({ id_solicitud, TipoPrueba, fecha_solicitud }) {
    this.id_solicitud = id_solicitud;
    this.nombre_prueba = TipoPrueba ? TipoPrueba.nombre : "Desconocido";
    this.fecha_solicitud = fecha_solicitud;
  }
}

module.exports = SolicitudPruebaResponseDTO;