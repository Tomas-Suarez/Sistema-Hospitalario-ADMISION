const { body } = require('express-validator');

const validarMedico = [

  body('nombre_usuario')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio.'),

  body('email')
    .isEmail()
    .withMessage('Debe ingresar un email válido.'),

  body('password')
    .if(body('id_medico').not().exists()) 
    .notEmpty()
    .withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4 })
    .withMessage('La contraseña debe tener al menos 4 caracteres.'),

  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres.'),
  
  body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligatorio.')
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres.'),

  body('documento')
    .isLength({ min: 7, max: 10 }).withMessage('El DNI debe tener entre 7 y 10 números.')
    .isNumeric().withMessage('El DNI solo puede contener números.'),
    
  body('genero')
    .notEmpty()
    .withMessage('Seleccione un género.'),

  body('matricula')
    .notEmpty()
    .withMessage('La matrícula es obligatoria.'),

  body('id_especialidad')
    .notEmpty()
    .withMessage('Seleccione una especialidad.'),

  body('id_guardia')
    .notEmpty()
    .withMessage('Seleccione una guardia.')
];

module.exports = { validarMedico };