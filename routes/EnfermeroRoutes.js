const express = require("express");
const router = express.Router();
const enfermeroController = require("../controllers/EnfermeroController");
const { validarEnfermero } = require("../middlewares/enfermeroValidator");
const { validationResult } = require("express-validator");

router.get("/GestionEnfermero", enfermeroController.getAllEnfermero);

router.post(
    "/registro",
    validarEnfermero,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(400).render("Enfermeros/RegistrarEnfermero", {
          errors: errors.array(),
          oldData: req.body,
        });
      }
      next();
    },
    enfermeroController.createEnfermero
  );
  
  router.put("/actualizar", enfermeroController.updateEnfermero);

  router.patch("/cambiar-estado", enfermeroController.changeStatusEnfermero);

module.exports = router;