const objectMapper = require("object-mapper");
const SignosVitalesResponseDTO = require("../dto/response/SignosVitalesResponseDTO");
const SignosVitales = require("../models/SignosVitalesModels");

const signosMap = {
  id_signo_vital: "id_signo_vital",
  fecha_registro: "fecha_registro",
  temperatura: "temperatura",
  presion_arterial: "presion_arterial",
  frecuencia_cardiaca: "frecuencia_cardiaca",
  frecuencia_respiratoria: "frecuencia_respiratoria",
  saturacion_oxigeno: "saturacion_oxigeno",
  observaciones: "observaciones",
  Enfermero: "enfermero"
};

function toEntity(requestDTO) {
  return SignosVitales.build({
    ...requestDTO,
    fecha_registro: new Date()
  });
}

function toDto(entity) {
  if (!entity) return null;
  const json = entity.toJSON ? entity.toJSON() : entity;
  const dtoObj = objectMapper(json, signosMap);
  return new SignosVitalesResponseDTO(dtoObj);
}

module.exports = {
    toEntity,
    toDto 
};