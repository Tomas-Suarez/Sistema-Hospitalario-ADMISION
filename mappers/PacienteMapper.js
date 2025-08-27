const objectMapper = require("object-mapper");
const PacienteResponseDTO = require("../dto/response/PacienteResponseDTO");
const Paciente = require("../models/PacienteModels");

const pacienteMap = {
  id_paciente: "id_paciente",
  nombre: "nombre",
  apellido: "apellido",
  documento: "documento",
  telefono: "telefono",
  fecha_nacimiento: "fecha_nacimiento",
  domicilio: "domicilio",
  genero: "genero",
  estatura: "estatura",
  peso: "peso",
  estado: "estado",
};

function toEntity(pacienteRequestDTO) {
  return Paciente.build({
    ...pacienteRequestDTO,
    estado: true,
  });
}

function toDto(pacienteEntity) {
  const dtoObj = objectMapper(pacienteEntity.toJSON(), pacienteMap);
  return new PacienteResponseDTO(dtoObj);
}

function updateEntityFromDto(pacienteRequestDTO, entity) {
  Object.assign(entity, pacienteRequestDTO);
  if (pacienteRequestDTO.estado === undefined) {
    entity.estado = entity.estado;
  }
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
