const AsignacionService = require("../service/AsignacionDormitorioService");

const getPacientesInternados = async (req, res, next) => {
  try {
    const internaciones = await AsignacionService.getAsignacionesActuales();

    res.render("Medicos/SeleccionarPaciente", { internaciones });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPacientesInternados,
};