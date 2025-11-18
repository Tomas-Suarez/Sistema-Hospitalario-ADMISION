const objectMapper = require("object-mapper");
const MedicoResponseDTO = require("../dto/response/MedicoResponseDTO");
const Medico = require("../models/MedicoModels");

const medicoMap = {
  id_medico: "id_medico",
  nombre: "nombre",
  apellido: "apellido",
  documento: "documento",
  telefono: "telefono",
  genero: "genero",
  matricula: "matricula",
  estado: "estado",
  Especialidad: "especialidad",
  guardia: "guardia" 
};

function toEntity(medicoRequestDTO) {
  return Medico.build({
    ...medicoRequestDTO,
    estado: true,
  });
}

function toDto(medicoEntity) {
  if (!medicoEntity) return null;
  const dtoObj = objectMapper(medicoEntity.toJSON(), medicoMap);
  return new MedicoResponseDTO(dtoObj);
}

function updateEntityFromDto(medicoRequestDTO, entity) {
  Object.assign(entity, medicoRequestDTO);
  if (medicoRequestDTO.estado === undefined) {
    entity.estado = entity.estado;
  }
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};