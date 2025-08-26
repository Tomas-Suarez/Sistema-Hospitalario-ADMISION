const AsignacionDormitorioService = require("../service/AsignacionDormitorioService");

// Controlador para obtener todas las asignaciones de dormitorio, de cierto paciente (Internados)
const getAsignacionesActuales = async (req, res, next) => {
  try {
    const internaciones = await AsignacionDormitorioService.getAsignacionesActuales();
    res.render("GestionarInternacion/GestionarInternacion", { internaciones });
    console.log("👉 Lo que llega al Pug:", JSON.stringify(internaciones, null, 2));

  } catch (error) {
    next(error)
  }
};

// Le asignamos un dormitorio a un paciente admitido 
const createAsignacionDormitorio = async (req, res, next) => {
  try {
    const datos = {
      id_admision: req.body.id_admision,
      id_habitacion: req.body.id_habitacion,
    };

    const { asignacion, creado } = await AsignacionDormitorioService.createAsignacionDormitorio(datos);

    if (creado) {
      res.redirect("/asignaciones/GestionInternacion");
    }

  } catch (error) {
    next(error)
  }
};

module.exports = {
    createAsignacionDormitorio,
    getAsignacionesActuales,
};