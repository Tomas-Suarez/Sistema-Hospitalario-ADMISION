const sequelize = require("../models/db");

// Importamos todos los models
require("../models/AdmisionModels");
require("../models/AsignDormitorioModels");
require("../models/CamaModels");
require("../models/ContactoEmergenciaModels");
require("../models/EnfermeroModels");
require("../models/EvaluacionMedicaModels");
require("../models/EspecialidadModels");
require("../models/HabitacionModels");
require("../models/HistorialMedicoModels");
require("../models/MedicoModels");
require("../models/MotivoAdmisionModels");
require("../models/PacienteModels");
require("../models/SeguroMedicoModels");
require("../models/TipoIngresoModels");
require("../models/TratamientoModels");
require("../models/AlaModels");
require("../models/GuardiaModels");
require("../models/AltaHospitalariaModels");
require("../models/MotivoAltaModels");
require("../models/RolModels");
require("../models/UsuarioModels");
require("../models/EvaluacionTratamientoModels");
require("../models/TipoPruebaModels");
require("../models/SolicitudPruebaModels")

async function syncDatabase() {
  try {
    console.log("Conectando a la base de datos...");
    await sequelize.sync({ force: false });
    console.log("¡Las tablas fueron creadas con éxito!");
  } catch (error) {
    console.error("Error en la base de datos:", error);
    process.exit(1);
  }
}

module.exports = syncDatabase;
