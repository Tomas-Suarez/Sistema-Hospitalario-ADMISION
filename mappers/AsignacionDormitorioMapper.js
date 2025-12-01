const objectMapper = require("object-mapper");
const AsignacionDormitorioResponseDTO = require("../dto/response/AsignacionDormitorioResponseDTO");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");

const asignacionMap = {
  id_asignacion_dormitorio: "id_asignacion_dormitorio",
  fecha_inicio: "fecha_inicio",
  fecha_fin: "fecha_fin",
  id_admision: "id_admision",
  id_cama: "id_cama",
  "Admision": "admision", 
  "Cama": "cama"
};

function toEntity(asignacionRequestDTO) {
  return AsignacionDormitorio.build({
    ...asignacionRequestDTO,
    fecha_inicio: asignacionRequestDTO.fecha_inicio || new Date()
  });
}

function toDto(asignacionEntity) {
  if (!asignacionEntity) return null;

  const json = asignacionEntity.toJSON ? asignacionEntity.toJSON() : asignacionEntity;

  if (json.Admision) {
    if (json.Admision.Paciente) {
        json.Admision.paciente = json.Admision.Paciente;
    }
    if (json.Admision.MotivoAdmision) {
        json.Admision.motivo = json.Admision.MotivoAdmision;
    }
    if (json.Admision.TipoIngreso) {
        json.Admision.tipo = json.Admision.TipoIngreso;
    }
  }

  if (json.Cama && json.Cama.Habitacion) {
    json.Cama.habitacion = json.Cama.Habitacion;
    
    if (json.Cama.Habitacion.Ala) {
        json.Cama.habitacion.ala = json.Cama.Habitacion.Ala;
    }
  }

  const dtoObj = objectMapper(json, asignacionMap);

  return new AsignacionDormitorioResponseDTO(dtoObj);
}

function updateEntityFromDto(asignacionRequestDTO, entity) {
  Object.assign(entity, asignacionRequestDTO);
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};