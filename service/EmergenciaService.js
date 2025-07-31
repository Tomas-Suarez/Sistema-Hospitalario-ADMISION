const AdmisionService = require("./AdmisionService");
const AsignacionDormitorioService = require("./AsignacionDormitorioService");

const { PACIENTE_NN } = require("../constants/PacienteConstants");
const { ERROR_CREACION_ADMISION } = require("../constants/AdmisionConstants");
const { ERROR_CREACION_ASIGNACION } = require("../constants/AsignacionDormitorioConstants");
const CreationFailedException = require("../exceptions/CreationFailedException");

const registrarYAsignarEmergencia = async (datos) => {
  const datosAdmision = {
    id_paciente: PACIENTE_NN,
    id_tipo: datos.id_tipo,
    id_motivo: datos.id_motivo,
    fecha_entrada: new Date(),
    detalles: datos.detalles,
  };

  const { admision, creado } = await AdmisionService.createAdmision(
    datosAdmision
  );

  if (!creado) {
    throw new CreationFailedException(ERROR_CREACION_ADMISION);
  }

  const datosAsignacion = {
    id_admision: admision.id_admision,
    id_habitacion: datos.id_habitacion,
  };

  const { asignacion, creado: creadoAsignacion } =
    await AsignacionDormitorioService.createAsignacionDormitorio(
      datosAsignacion
    );

  if (!creadoAsignacion) {
    throw new CreationFailedException(ERROR_CREACION_ASIGNACION);
  }

  return {
    creado: true,
    admision,
    asignacion,
  };
};

module.exports = {
    registrarYAsignarEmergencia
}