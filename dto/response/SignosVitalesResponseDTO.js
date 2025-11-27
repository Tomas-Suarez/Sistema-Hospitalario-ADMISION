const EnfermeroResponseDTO = require("./EnfermeroResponseDTO");

class SignosVitalesResponseDTO {
  constructor({
    id_signo_vital,
    fecha_registro,
    temperatura,
    presion_arterial,
    frecuencia_cardiaca,
    frecuencia_respiratoria,
    saturacion_oxigeno,
    observaciones,
    enfermero
  }) {
    this.id_signo_vital = id_signo_vital;
    this.fecha_registro = fecha_registro;
    this.temperatura = temperatura;
    this.presion_arterial = presion_arterial;
    this.frecuencia_cardiaca = frecuencia_cardiaca;
    this.frecuencia_respiratoria = frecuencia_respiratoria || "-";
    this.saturacion_oxigeno = saturacion_oxigeno ? saturacion_oxigeno + "%" : "-";
    this.observaciones = observaciones || "-";
    this.enfermero = enfermero ? new EnfermeroResponseDTO(enfermero) : null;
  }
}

module.exports = SignosVitalesResponseDTO;