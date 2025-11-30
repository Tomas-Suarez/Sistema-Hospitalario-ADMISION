const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const enfermeroController = require("../controllers/EnfermeroController");
const { validarEnfermero } = require("../middlewares/enfermeroValidator");
const checkRole = require("../middlewares/authRole");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("Enfermeros/RegistrarEnfermero", {
      errors: errors.array(),
      oldData: req.body,
    });
  }
  next();
};

router.get(
  "/GestionEnfermero",
  checkRole("Admin"),
  enfermeroController.getAllEnfermero
);
router.post(
  "/registro",
  checkRole("Admin"),
  validarEnfermero,
  handleValidationErrors,
  enfermeroController.createEnfermero
);
router.put(
  "/actualizar",
  checkRole("Admin"),
  enfermeroController.updateEnfermero
);
router.patch(
  "/cambiar-estado",
  checkRole("Admin"),
  enfermeroController.changeStatusEnfermero
);

module.exports = router;
