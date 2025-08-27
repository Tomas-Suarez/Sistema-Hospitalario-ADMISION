const syncDatabase = require("./config/dbSync");
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('./models/Asociaciones'); //Importa y ejecuta todas las asociaciones de los models - SEQUELIZE
const logging = require('./middlewares/logging');
const GlobalErrorHandler = require("./middlewares/GlobalErrorHandler")
const app = express();

// Importar las rutas
const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/MedicoRoutes');
const enfermeroRoutes = require('./routes/EnfermeroRoutes');
const admisionRoutes = require('./routes/AdmisionRoutes');
const habitacionRoutes = require('./routes/HabitacionRoutes');
const asignacionRoutes = require('./routes/AsignacionDormitorioRoutes');
const usuarioRoutes = require('./routes/UsuarioRoutes');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define la carpeta "public" para usar los archivos estaticos (css, js, img)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para logging personalizado de las peticiones
app.use(logging);

// Middleware para obtener datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Permite sobreexribir los metodos, para poder usar put, path, etc
app.use(methodOverride((req, res) => {
  const method = req.body && req.body._method;
  const allowed = ['PATCH', 'PUT'];
  if (method && allowed.includes(method.toUpperCase())) {
    return method;
  }
})); // NOTA: No me funciona el app.use(methodOverride('_method')); Lo tuve que hacer de la otra forma

// Rutas
app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/enfermeros', enfermeroRoutes);
app.use('/admisiones', admisionRoutes);
app.use('/habitaciones', habitacionRoutes);
app.use('/asignaciones', asignacionRoutes);
app.use('/usuarios', usuarioRoutes);


// Ruta principal donde se encuentra la vista principal
app.get('/', (req, res) =>{
    res.render('Principal');
})

//Middleware para renderizar cuando ocurre un error
app.use((req, res, next) => {
  res.status(404).render("error", {
    status: 404,
    message: "Página no encontrada",
  });
});

// Middleware global de errores
app.use(GlobalErrorHandler);

// Sincronización de la Base de datos antes de iniciar el servidor
syncDatabase().then(() => {
  // Inicio del servidor
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000...");
  });
});