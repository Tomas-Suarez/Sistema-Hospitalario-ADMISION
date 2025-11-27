class SignosVitalesRequestDTO {
  constructor({
    id_admision,
    temperatura,
    presion_arterial,
    frecuencia_cardiaca,
    frecuencia_respiratoria,
    saturacion_oxigeno,
    observaciones
  }) {
    this.id_admision = parseInt(id_admision);
    this.temperatura = parseFloat(temperatura);
    this.presion_arterial = presion_arterial;
    this.frecuencia_cardiaca = parseInt(frecuencia_cardiaca);
    this.frecuencia_respiratoria = frecuencia_respiratoria ? parseInt(frecuencia_respiratoria) : null;
    this.saturacion_oxigeno = saturacion_oxigeno ? parseInt(saturacion_oxigeno) : null;
    this.observaciones = observaciones;
  }
}

module.exports = SignosVitalesRequestDTO;