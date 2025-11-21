const MedicoResponseDTO = require("./MedicoResponseDTO");
const TratamientoResponseDTO = require("./TratamientoResponseDTO");

class EvaluacionMedicaResponseDTO {
  constructor({
    id_evaluacion_medica,
    id_admision,
    fecha,
    observaciones,
    medico,
    Tratamientos
  }) {
    this.id_evaluacion_medica = id_evaluacion_medica;
    this.id_admision = id_admision;
    this.fecha = fecha;
    this.observaciones = observaciones;
    this.medico = medico ? new MedicoResponseDTO(medico) : null;
    this.Tratamientos = (Tratamientos && Array.isArray(Tratamientos))
      ? Tratamientos.map(t => new TratamientoResponseDTO(t))
      : [];
  }
}

module.exports = EvaluacionMedicaResponseDTO;