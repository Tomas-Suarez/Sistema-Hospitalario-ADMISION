const AsignacionDormitorioResponseDTO = require("../dto/response/AsignacionDormitorioResponseDTO");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const AdmisionResponseDTO = require("../dto/response/AdmisionResponseDTO");
const CamaResponseDTO = require("../dto/response/CamaResponseDTO");

function toEntity(asignacionRequestDTO) {
  return AsignacionDormitorio.build({
    id_admision: asignacionRequestDTO.id_admision,
    id_cama: asignacionRequestDTO.id_cama,
    fecha_inicio: asignacionRequestDTO.fecha_inicio,
    fecha_fin: asignacionRequestDTO.fecha_fin,
  });
}

function toDto(asignacionEntity) {
  if (!asignacionEntity) return null;

  return new AsignacionDormitorioResponseDTO({
    id_asignacion_dormitorio: asignacionEntity.id_asignacion_dormitorio,
    fecha_inicio: asignacionEntity.fecha_inicio,
    fecha_fin: asignacionEntity.fecha_fin,
    admision: asignacionEntity.Admision
      ? new AdmisionResponseDTO({
          id_admision: asignacionEntity.Admision.id_admision,
          fecha_entrada: asignacionEntity.Admision.fecha_entrada,
          fecha_salida: asignacionEntity.Admision.fecha_salida,
          detalles: asignacionEntity.Admision.detalles,
          estado: asignacionEntity.Admision.estado,
          tipo_ingreso: asignacionEntity.Admision.tipo_ingreso,
          motivo: asignacionEntity.Admision.motivo,
          paciente: asignacionEntity.Admision.Paciente,
        })
      : null,
    cama: asignacionEntity.Cama
      ? new CamaResponseDTO({
          id_cama: asignacionEntity.Cama.id_cama,
          numero: asignacionEntity.Cama.numero,
          libre: asignacionEntity.Cama.libre,
          higienizada: asignacionEntity.Cama.higienizada,
          habitacion: asignacionEntity.Cama.Habitacion,
        })
      : null,
  });
}

function updateEntityFromDto(asignacionRequestDTO, entity) {
  entity.id_admision = asignacionRequestDTO.id_admision;
  entity.id_cama = asignacionRequestDTO.id_cama;
  entity.fecha_inicio = asignacionRequestDTO.fecha_inicio;
  entity.fecha_fin = asignacionRequestDTO.fecha_fin;
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
