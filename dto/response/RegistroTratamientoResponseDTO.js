const EnfermeroResponseDTO = require("./EnfermeroResponseDTO");
const TratamientoResponseDTO = require("./TratamientoResponseDTO");

class RegistroTratamientoResponseDTO {
  constructor({
    id_registro_tratamiento,
    fecha_realizacion,
    observaciones,
    enfermero,
    tratamiento
  }) {
    this.id_registro_tratamiento = id_registro_tratamiento;
    this.fecha_realizacion = fecha_realizacion;
    this.observaciones = observaciones || "-";
    this.enfermero = enfermero ? new EnfermeroResponseDTO(enfermero) : null;
    this.tratamiento = tratamiento ? new TratamientoResponseDTO(tratamiento) : null;
  }
}

module.exports = RegistroTratamientoResponseDTO;