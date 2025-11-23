const objectMapper = require("object-mapper");
const EvaluacionMedicaResponseDTO = require("../dto/response/EvaluacionMedicaResponseDTO");
const EvaluacionMedica = require("../models/EvaluacionMedicaModels");

const evaluacionMap = {
  id_evaluacion_medica: "id_evaluacion_medica",
  id_medico: "id_medico",
  id_admision: "id_admision",
  id_tratamiento: "id_tratamiento",
  observaciones: "observaciones",
  fecha: "fecha",
  Medico: "medico",
  Tratamientos: "Tratamientos",
  SolicitudPruebas: "SolicitudPruebas"
};

function toEntity(requestDTO) {
  return EvaluacionMedica.build({
    ...requestDTO,
  });
}

function toDto(entity) {
  if (!entity) return null;

  const json = entity.toJSON();
  const dtoObj = objectMapper(json, evaluacionMap);

  return new EvaluacionMedicaResponseDTO(dtoObj);
}

module.exports = {
  toEntity,
  toDto
};