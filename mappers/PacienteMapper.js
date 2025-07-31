const PacienteResponseDTO = require("../dto/response/PacienteResponseDTO");
const Paciente = require("../models/PacienteModels");

function toEntity(pacienteRequestDTO) {
  return Paciente.build({
    id_seguro: pacienteRequestDTO.id_seguro,
    nombre: pacienteRequestDTO.nombre,
    apellido: pacienteRequestDTO.apellido,
    documento: pacienteRequestDTO.documento,
    telefono: pacienteRequestDTO.telefono,
    fecha_nacimiento: pacienteRequestDTO.fecha_nacimiento,
    domicilio: pacienteRequestDTO.domicilio,
    genero: pacienteRequestDTO.genero,
    estatura: pacienteRequestDTO.estatura,
    peso: pacienteRequestDTO.peso,
    estado: true,
  });
}

function toDto(pacienteEntity) {
  return new PacienteResponseDTO(pacienteEntity);
}

function updateEntityFromDto(pacienteRequestDTO, entity) {
  entity.id_seguro = pacienteRequestDTO.id_seguro;
  entity.nombre = pacienteRequestDTO.nombre;
  entity.apellido = pacienteRequestDTO.apellido;
  entity.documento = pacienteRequestDTO.documento;
  entity.telefono = pacienteRequestDTO.telefono;
  entity.fecha_nacimiento = pacienteRequestDTO.fecha_nacimiento;
  entity.domicilio = pacienteRequestDTO.domicilio;
  entity.genero = pacienteRequestDTO.genero;
  entity.estatura = pacienteRequestDTO.estatura;
  entity.peso = pacienteRequestDTO.peso;
  entity.estado = pacienteRequestDTO.estado !== undefined ? pacienteRequestDTO.estado : entity.estado;
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
