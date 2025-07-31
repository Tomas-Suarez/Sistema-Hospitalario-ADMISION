const EmergenciaService = require("../service/EmergenciaService");

const registrarYAsignarEmergencia = async (req, res, next) => {
  try {
    const { admision, asignacion } = await EmergenciaService.registrarYAsignarEmergencia(req.body);

    return res.redirect("/asignaciones/GestionInternacion/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrarYAsignarEmergencia,
};

module.exports = {
  registrarYAsignarEmergencia,
};
