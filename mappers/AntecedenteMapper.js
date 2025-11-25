const objectMapper = require("object-mapper");
const AntecedenteResponseDTO = require("../dto/response/AntecedenteResponseDTO");

const antecedenteMap = {
  id_antecedente: "id_antecedente",
  nombre: "nombre",
};

function toDto(entity) {
  if (!entity) return null;
  
  const json = entity.toJSON ? entity.toJSON() : entity;
  const dtoObj = objectMapper(json, antecedenteMap);

  return new AntecedenteResponseDTO(dtoObj);
}

module.exports = {
  toDto,
};