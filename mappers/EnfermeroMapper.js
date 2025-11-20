const objectMapper = require("object-mapper");
const EnfermeroResponseDTO = require("../dto/response/EnfermeroResponseDTO");
const Enfermero = require("../models/EnfermeroModels");

const enfermeroMap = {
  id_enfermero: "id_enfermero",
  nombre: "nombre",
  apellido: "apellido",
  documento: "documento",
  genero: "genero",
  matricula: "matricula",
  estado: "estado",
  id_guardia: "id_guardia",
  guardia: "guardia" 
};

function toEntity(enfermeroRequestDTO) {
  return Enfermero.build({
    ...enfermeroRequestDTO,
    estado: true,
  });
}

function toDto(enfermeroEntity) {
  if (!enfermeroEntity) return null;
  
  const enfermeroJson = enfermeroEntity.toJSON();
  
  const dtoObj = objectMapper(enfermeroJson, enfermeroMap);
  
  return new EnfermeroResponseDTO(dtoObj);
}

function updateEntityFromDto(enfermeroRequestDTO, entity) {
  Object.assign(entity, enfermeroRequestDTO);
  if (enfermeroRequestDTO.estado === undefined) {
    entity.estado = entity.estado;
  }
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};