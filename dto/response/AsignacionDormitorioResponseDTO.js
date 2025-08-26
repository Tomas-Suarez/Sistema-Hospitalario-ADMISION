const AdmisionResponseDTO = require("../response/AdmisionResponseDTO");
const CamaResponseDTO = require("../response/CamaResponseDTO"); // falta

class AsignacionDormitorioResponseDTO {
  constructor({
    id_asignacion_dormitorio,
    fecha_inicio,
    fecha_fin,
    admision,
    cama,
  }) {
    this.id_asignacion_dormitorio = id_asignacion_dormitorio;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.admision = admision ? new AdmisionResponseDTO(admision) : null;
    this.cama = cama ? new CamaResponseDTO(cama) : null;
  }
}

module.exports = AsignacionDormitorioResponseDTO;
