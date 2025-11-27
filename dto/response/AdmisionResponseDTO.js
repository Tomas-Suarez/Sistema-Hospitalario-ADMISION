const PacienteResponseDTO = require("../response/PacienteResponseDTO");

class AdmisionResponseDTO {
  constructor({
    id_admision,
    fecha_entrada,
    fecha_salida,
    detalles,
    estado,
    tipo,
    motivo,
    paciente,
    numero_habitacion,
    numero_cama
  }) {
    this.id_admision = id_admision;
    this.fecha_entrada = fecha_entrada;
    this.fecha_salida = fecha_salida;
    this.detalles = detalles;
    this.estado = estado;
    this.tipo_ingreso = tipo?.descripcion || null;
    this.motivo = motivo?.descripcion || null;
    this.paciente = paciente ? new PacienteResponseDTO(paciente) : null;
    this.numero_habitacion = numero_habitacion || null;
    this.numero_cama = numero_cama || null;
  }
}

module.exports = AdmisionResponseDTO;