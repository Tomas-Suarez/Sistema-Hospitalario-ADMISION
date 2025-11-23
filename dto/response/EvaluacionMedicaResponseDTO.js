const MedicoResponseDTO = require("./MedicoResponseDTO");
const TratamientoResponseDTO = require("./TratamientoResponseDTO");
const SolicitudPruebaResponseDTO = require("./SolicitudPruebaResponseDTO");

class EvaluacionMedicaResponseDTO {
  constructor({
    id_evaluacion_medica,
    id_admision,
    fecha,
    observaciones,
    medico,
    Tratamientos,
    SolicitudPruebas
  }) {
    this.id_evaluacion_medica = id_evaluacion_medica;
    this.id_admision = id_admision;
    this.fecha = fecha;
    this.observaciones = observaciones;
    
    this.medico = medico ? new MedicoResponseDTO(medico) : null;
    
    this.Tratamientos = (Tratamientos && Array.isArray(Tratamientos))
      ? Tratamientos.map(t => new TratamientoResponseDTO(t))
      : [];

    this.SolicitudPruebas = (SolicitudPruebas && Array.isArray(SolicitudPruebas))
      ? SolicitudPruebas.map(s => new SolicitudPruebaResponseDTO(s))
      : [];
  }
}

module.exports = EvaluacionMedicaResponseDTO;