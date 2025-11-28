const objectMapper = require("object-mapper");
const RegistroTratamientoResponseDTO = require("../dto/response/RegistroTratamientoResponseDTO");
const RegistroTratamiento = require("../models/RegistroTratamientoModels");

const registroMap = {
  id_registro_tratamiento: "id_registro_tratamiento",
  fecha_realizacion: "fecha_realizacion",
  observaciones: "observaciones",
  Enfermero: "enfermero",
  Tratamiento: "tratamiento"
};

function toEntity(requestDTO) {
  return RegistroTratamiento.build({
    id_admision: requestDTO.id_admision,
    id_tratamiento: requestDTO.id_tratamiento,
    observaciones: requestDTO.observaciones,
    fecha_realizacion: new Date()
  });
}

function toDto(entity) {
  if (!entity) return null;
  
  const json = entity.toJSON ? entity.toJSON() : entity;
  const dtoObj = objectMapper(json, registroMap);
  
  return new RegistroTratamientoResponseDTO(dtoObj);
}

module.exports = {
  toEntity,
  toDto
};