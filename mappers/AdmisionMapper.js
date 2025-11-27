const objectMapper = require("object-mapper");
const AdmisionResponseDTO = require("../dto/response/AdmisionResponseDTO");
const Admision = require("../models/AdmisionModels");

const admisionMap = {
  id_admision: "id_admision",
  id_paciente: "id_paciente",
  id_tipo: "id_tipo",
  id_motivo: "id_motivo",
  fecha_entrada: "fecha_entrada",
  fecha_salida: "fecha_salida",
  detalles: "detalles",
  estado: "estado",
};

function toEntity(admisionRequestDTO) {
  return Admision.build({
    ...admisionRequestDTO,
    estado: true,
  });
}

function toDto(admisionEntity) {
  if (!admisionEntity) return null;

  const json = admisionEntity.toJSON ? admisionEntity.toJSON() : admisionEntity;
  const dtoObj = objectMapper(json, admisionMap);

  let habitacionNum = null;
  let camaNum = null;

  if (json.AsignacionDormitorios && json.AsignacionDormitorios.length > 0) {
    const asignacion = json.AsignacionDormitorios.find(a => !a.fecha_fin);
    
    if (asignacion && asignacion.Cama) {
        camaNum = asignacion.Cama.numero;
        
        if (asignacion.Cama.Habitacion) {
            habitacionNum = asignacion.Cama.Habitacion.numero;
        }
    }
  }

  return new AdmisionResponseDTO({
    ...dtoObj,
    tipo: json.TipoIngreso || null,
    motivo: json.MotivoAdmision || null,
    paciente: json.Paciente || null,
    numero_habitacion: habitacionNum,
    numero_cama: camaNum
  });
}

function updateEntityFromDto(admisionRequestDTO, entity) {
  Object.assign(entity, admisionRequestDTO);
  if (admisionRequestDTO.estado === undefined) {
    entity.estado = entity.estado;
  }
}

module.exports = {
  toEntity,
  toDto,
  updateEntityFromDto,
};