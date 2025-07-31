class AdmisionRequestDTO {
  constructor({
    id_paciente,
    id_tipo,
    id_motivo,
    fecha_entrada,
    fecha_salida,
    detalles,
    estado
  }) {
    this.id_paciente = id_paciente;
    this.id_tipo = id_tipo;
    this.id_motivo = id_motivo;
    this.fecha_entrada = fecha_entrada;
    this.fecha_salida = fecha_salida;
    this.detalles = detalles;
    this.estado = estado;
  }
}

module.exports = AdmisionRequestDTO;