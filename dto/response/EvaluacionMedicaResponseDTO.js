const MedicoResponseDTO = require("./MedicoResponseDTO");
const TratamientoResponseDTO = require("./TratamientoResponseDTO");

class EvaluacionMedicaResponseDTO {
  constructor({
    id_evaluacion_medica,
    fecha,
    observaciones,
    medico,
    tratamiento
  }) {
    this.id_evaluacion_medica = id_evaluacion_medica;
    this.fecha = fecha;
    this.observaciones = observaciones;
    this.medico = medico ? new MedicoResponseDTO(medico) : null;
    this.tratamiento = tratamiento ? new TratamientoResponseDTO(tratamiento) : null;
  }
}

module.exports = EvaluacionMedicaResponseDTO;