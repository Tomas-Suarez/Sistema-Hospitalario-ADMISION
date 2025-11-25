const objectMapper = require("object-mapper");
const AlergiaResponseDTO = require("../dto/response/AlergiaResponseDTO");
const Alergia = require("../models/AlergiaModels");

const alergiaMap = {
  id_alergia: "id_alergia",
  nombre: "nombre",
};

function toEntity(alergiaRequestDTO) {
  return Alergia.build({
    id_alergia: alergiaRequestDTO.id_alergia,
    nombre: alergiaRequestDTO.nombre,
  });
}

function toDto(alergiaEntity) {
  if (!alergiaEntity) return null;

  const json = alergiaEntity.toJSON ? alergiaEntity.toJSON() : alergiaEntity;
  const dtoObj = objectMapper(json, alergiaMap);

  return new AlergiaResponseDTO(dtoObj);
}

module.exports = {
  toEntity,
  toDto,
};