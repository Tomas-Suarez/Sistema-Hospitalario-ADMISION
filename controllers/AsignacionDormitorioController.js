const AsignacionDormitorioService = require("../service/AsignacionDormitorioService");
const AlaService = require("../service/AlaService");

// Obtenemos todas las asignaciones de dormitorio, de cierto paciente (Internados)
const getAsignacionesActuales = async (req, res, next) => {
  try {
    const internaciones = await AsignacionDormitorioService.getAsignacionesActuales();
    
    const alas = await AlaService.getAllAlas();

    res.render("GestionarInternacion/GestionarInternacion", { 
      internaciones, 
      alas 
    });

  } catch (error) {
    next(error);
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

const cambiarHabitacion = async (req, res, next) => {
  try {
    const datos = {
      id_admision: req.body.id_admision,
      id_habitacion: req.body.id_habitacion 
    };

    await AsignacionDormitorioService.cambiarHabitacion(datos);

    res.redirect("/asignaciones/GestionInternacion");
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createAsignacionDormitorio,
    getAsignacionesActuales,
    cambiarHabitacion
};