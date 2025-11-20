class EvaluacionMedicaRequestDTO {
  constructor({
    id_evaluacion_medica,
    id_medico,
    id_admision,
    id_tratamiento,
    observaciones,
  }) {
    this.id_evaluacion_medica = id_evaluacion_medica;
    this.id_medico = id_medico;
    this.id_admision = id_admision;
    this.id_tratamiento = id_tratamiento;
    this.observaciones = observaciones;
  }
}

module.exports = EvaluacionMedicaRequestDTO;