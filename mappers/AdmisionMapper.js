const AdmisionResponseDTO = require("../dto/response/AdmisionResponseDTO");
const Admision = require("../models/AdmisionModels");

function toEntity(admisionRequestDTO) {
  return Admision.build({
    id_paciente: admisionRequestDTO.id_paciente,
    id_tipo: admisionRequestDTO.id_tipo,
    id_motivo: admisionRequestDTO.id_motivo,
    fecha_entrada: admisionRequestDTO.fecha_entrada,
    fecha_salida: admisionRequestDTO.fecha_salida,
    detalles: admisionRequestDTO.detalles,
    estado: true,
  });
}

function toDto(admisionEntity) {
  if (!admisionEntity) return null;

  return new AdmisionResponseDTO({
    id_admision: admisionEntity.id_admision,
    fecha_entrada: admisionEntity.fecha_entrada,
    fecha_salida: admisionEntity.fecha_salida,
    detalles: admisionEntity.detalles,
    estado: admisionEntity.estado,
    tipo: admisionEntity.TipoIngreso,
    motivo: admisionEntity.MotivoAdmision,
    paciente: admisionEntity.Paciente,
  });
}

function updateEntityFromDto(admisionRequestDTO, entity) {
  entity.id_paciente = admisionRequestDTO.id_paciente;
  entity.id_tipo = admisionRequestDTO.id_tipo;
  entity.id_motivo = admisionRequestDTO.id_motivo;
  entity.fecha_entrada = admisionRequestDTO.fecha_entrada;
  entity.fecha_salida = admisionRequestDTO.fecha_salida;
  entity.detalles = admisionRequestDTO.detalles;
  entity.estado = admisionRequestDTO.estado !== undefined ? admisionRequestDTO.estado : entity.estado;
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
