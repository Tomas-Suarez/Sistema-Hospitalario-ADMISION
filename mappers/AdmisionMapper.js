const objectMapper = require("object-mapper");
const AdmisionResponseDTO = require("../dto/response/AdmisionResponseDTO");
const Admision = require("../models/AdmisionModels");

const admisionMap = {
  "id_admision": "id_admision",
  "id_paciente": "id_paciente",
  "id_tipo": "id_tipo",
  "id_motivo": "id_motivo",
  "fecha_entrada": "fecha_entrada",
  "fecha_salida": "fecha_salida",
  "detalles": "detalles",
  "estado": "estado"
};

function toEntity(admisionRequestDTO) {
  return Admision.build({
    ...admisionRequestDTO,
    estado: true,
  });
}

function toDto(admisionEntity) {
  if (!admisionEntity) return null;

  const dtoObj = objectMapper(admisionEntity.toJSON(), admisionMap);

  return new AdmisionResponseDTO({
    ...dtoObj,
    tipo: admisionEntity.TipoIngreso || null,
    motivo: admisionEntity.MotivoAdmision || null,
    paciente: admisionEntity.Paciente || null,
  });
}

function updateEntityFromDto(admisionRequestDTO, entity) {
  Object.assign(entity, admisionRequestDTO);

  if (admisionRequestDTO.estado === undefined) {
    entity.estado = entity.estado;
  }
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
