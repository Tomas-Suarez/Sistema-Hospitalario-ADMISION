const objectMapper = require("object-mapper");
const AsignacionDormitorioResponseDTO = require("../dto/response/AsignacionDormitorioResponseDTO");
const AdmisionResponseDTO = require("../dto/response/AdmisionResponseDTO");
const CamaResponseDTO = require("../dto/response/CamaResponseDTO");
const HabitacionResponseDTO = require("../dto/response/HabitacionResponseDTO");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");

const asignacionMap = {
  "id_asignacion_dormitorio": "id_asignacion_dormitorio",
  "fecha_inicio": "fecha_inicio",
  "fecha_fin": "fecha_fin",
  "id_admision": "id_admision",
  "id_cama": "id_cama"
};

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

  const dtoObj = objectMapper(asignacionEntity.toJSON(), asignacionMap);

  const admisionDto = asignacionEntity.Admision
    ? new AdmisionResponseDTO({
        id_admision: asignacionEntity.Admision.id_admision,
        fecha_entrada: asignacionEntity.Admision.fecha_entrada,
        fecha_salida: asignacionEntity.Admision.fecha_salida,
        detalles: asignacionEntity.Admision.detalles,
        estado: asignacionEntity.Admision.estado,
        tipo_ingreso: asignacionEntity.Admision.tipo_ingreso || null,
        motivo: asignacionEntity.Admision.motivo || null,
        paciente: asignacionEntity.Admision.Paciente || null,
      })
    : null;

  const habitacionDto = asignacionEntity.Cama?.Habitacion
    ? new HabitacionResponseDTO({
        id_habitacion: asignacionEntity.Cama.Habitacion.id_habitacion,
        numero: asignacionEntity.Cama.Habitacion.numero,
        capacidad: asignacionEntity.Cama.Habitacion.capacidad,
        ala: asignacionEntity.Cama.Habitacion.Ala,
      })
    : null;

  const camaDto = asignacionEntity.Cama
    ? new CamaResponseDTO({
        id_cama: asignacionEntity.Cama.id_cama,
        numero: asignacionEntity.Cama.numero,
        libre: asignacionEntity.Cama.libre,
        higienizada: asignacionEntity.Cama.higienizada,
        habitacion: habitacionDto,
      })
    : null;

  return new AsignacionDormitorioResponseDTO({
    ...dtoObj,
    admision: admisionDto,
    cama: camaDto,
  });
}

function updateEntityFromDto(asignacionRequestDTO, entity) {
  Object.assign(entity, asignacionRequestDTO);
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};
