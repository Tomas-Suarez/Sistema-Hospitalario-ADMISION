class AsignacionDormitorioRequestDTO {
  constructor({
    id_asignacion_dormitorio,
    id_admision,
    id_cama,
    fecha_inicio,
    fecha_fin,
  }) {
    this.id_asignacion_dormitorio = id_asignacion_dormitorio;
    this.id_admision = id_admision;
    this.id_cama = id_cama;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
  }
}

module.exports = AsignacionDormitorioRequestDTO;