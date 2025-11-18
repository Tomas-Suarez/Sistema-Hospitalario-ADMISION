const express = require("express");
const router = express.Router();
const medicoController = require("../controllers/MedicoController");
const { validarMedico } = require("../middlewares/medicoValidator");
const { validationResult } = require("express-validator");

// Mostrar medico
router.get("/GestionMedico", medicoController.getAllMedico);

// Crear medico
router.post(
    "/registro",
    validarMedico, // Validacion
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("Medicos/RegistrarMedico", {
          errors: errors.array(),
          oldData: req.body,
        });
      }
      next();
    },
    medicoController.createMedico
  );
  
  // Actualizar medico
  router.put("/actualizar", medicoController.updateMedico);

  // Cambiar el estado de un medico
  router.patch("/cambiar-estado", medicoController.changeStatusMedico);

module.exports = router;