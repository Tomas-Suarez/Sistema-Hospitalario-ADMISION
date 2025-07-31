const express = require("express");
const router = express.Router();
const AdmisionController = require("../controllers/AdmisionController");
const EmergenciaController = require("../controllers/EmergenciaController");
const { validarAdmision } = require("../middlewares/admisionValidator");
const { validationResult } = require("express-validator");

// Obtenes las admisiones
router.get("/InternacionPaciente", AdmisionController.getAllAdmisiones);

// Crear una nueva admision
router.post(
  "/registrar",
  validarAdmision,
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("Admisiones/RegistrarAdmision", {
        errors: errors.array(),
        oldData: req.body,
      });
    }
    next();
  },
  AdmisionController.createAdmision
);

// Creamos una admision y luego asignamos una habitacion
router.post("/registrarEmergencia", EmergenciaController.registrarYAsignarEmergencia);

// Cancelar una admision - Cambiar el estado del estado booleano a false
router.patch("/cancelarAdmision/:id", AdmisionController.darDeBajaAdmision);

module.exports = router;
