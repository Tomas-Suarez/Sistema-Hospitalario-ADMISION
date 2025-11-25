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
  "SeguroMedico": "seguro"
};

function toEntity(pacienteRequestDTO) {
  return Paciente.build({
    ...pacienteRequestDTO,
    estado: true,
  });
}

function toDto(pacienteEntity) {
  if (!pacienteEntity) return null;

  const json = pacienteEntity.toJSON ? pacienteEntity.toJSON() : pacienteEntity;
  
  const dtoObj = objectMapper(json, pacienteMap);

  return new PacienteResponseDTO({
    ...dtoObj,
    alergias: json.Alergias, 
  });
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