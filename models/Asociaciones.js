const Admision = require("./AdmisionModels");
const AsignacionDormitorio = require("./AsignDormitorioModels");
const Cama = require("./CamaModels");
const Enfermero = require("./EnfermeroModels");
const EvaluacionEnfermeria = require("./EvaluacionEnfermeriaModels");
const EvaluacionMedica = require("./EvaluacionMedicaModels");
const Habitacion = require("./HabitacionModels");
const HistorialMedico = require("./HistorialMedicoModels");
const Medico = require("./MedicoModels");
const Paciente = require("./PacienteModels");
const PlanCuidados = require("./PlanCuidadosModels");
const Tratamiento = require("./TratamientoModels");
const TipoIngreso = require("./TipoIngresoModels");
const Especialidad = require("./EspecialidadModels");
const Guardia = require("./GuardiaModels");
const ContactoEmergencia = require("./ContactoEmergenciaModels");
const SeguroMedico = require("./SeguroMedicoModels");
const MotivoAdmision = require("./MotivoAdmisionModels");
const Ala = require("./AlaModels");
const Usuario = require("./UsuarioModels");
const Rol = require("./RolModels");
const EvaluacionTratamiento = require("./EvaluacionTratamientoModels");
const TipoPrueba = require("./TipoPruebaModels");
const SolicitudPrueba = require("./SolicitudPruebaModels");
const Alergia = require("./AlergiaModels");
const PacienteAlergia = require("./PacienteAlergiaModels");
const Antecedente = require("./AntecedenteModels");
const PacienteAntecedente = require("./PacienteAntecedenteModels");

// Relación Paciente - Admision
Paciente.hasMany(Admision, { foreignKey: "id_paciente" });
Admision.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Relación Paciente - ContactoEmergencia
Paciente.hasMany(ContactoEmergencia, { 
  foreignKey: "id_paciente", 
  onDelete: 'CASCADE',
  as: 'contactos'
});

ContactoEmergencia.belongsTo(Paciente, { 
  foreignKey: "id_paciente",
  as: 'paciente' 
});

// Relación Paciente - SeguroMedico
SeguroMedico.hasMany(Paciente, { foreignKey: "id_seguro" });
Paciente.belongsTo(SeguroMedico, { foreignKey: "id_seguro" });

// Relación Admision - MotivoAdmision
MotivoAdmision.hasMany(Admision, { foreignKey: "id_motivo" });
Admision.belongsTo(MotivoAdmision, { foreignKey: "id_motivo" });

// Relación Admision - EvaluacionEnfermeria
Admision.hasMany(EvaluacionEnfermeria, { foreignKey: "id_admision" });
EvaluacionEnfermeria.belongsTo(Admision, { foreignKey: "id_admision" });

// Relación Enfermero - Usuario
Usuario.hasOne(Enfermero, { foreignKey: "id_usuario" });
Enfermero.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relación Enfermero - EvaluacionEnfermeria
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: "id_enfermero" });
EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: "id_enfermero" });

// Relación Enfermero - Guardia
Guardia.hasMany(Enfermero, { foreignKey: "id_guardia", as: "enfermeros" });
Enfermero.belongsTo(Guardia, { foreignKey: "id_guardia", as: "guardia" });

// Relación PlanCuidados - EvaluacionEnfermeria
PlanCuidados.hasMany(EvaluacionEnfermeria, { foreignKey: "id_plan" });
EvaluacionEnfermeria.belongsTo(PlanCuidados, { foreignKey: "id_plan" });

// Relación Admision - EvaluacionMedica
Admision.hasMany(EvaluacionMedica, { foreignKey: "id_admision" });
EvaluacionMedica.belongsTo(Admision, { foreignKey: "id_admision" });

// 1. Admisión - Solicitudes
Admision.hasMany(SolicitudPrueba, { foreignKey: "id_admision" });
SolicitudPrueba.belongsTo(Admision, { foreignKey: "id_admision" });

// 2. Médico - Solicitudes
Medico.hasMany(SolicitudPrueba, { foreignKey: "id_medico" });
SolicitudPrueba.belongsTo(Medico, { foreignKey: "id_medico" });

// 3. Tipo de Prueba - Solicitudes
TipoPrueba.hasMany(SolicitudPrueba, { foreignKey: "id_tipo_prueba" });
SolicitudPrueba.belongsTo(TipoPrueba, { foreignKey: "id_tipo_prueba" });

// 4. Evaluación Médica - Solicitudes
EvaluacionMedica.hasMany(SolicitudPrueba, { foreignKey: "id_evaluacion_medica" });
SolicitudPrueba.belongsTo(EvaluacionMedica, { foreignKey: "id_evaluacion_medica" });

// Relación Muchos a Muchos Evaluacion - Tratamiento
EvaluacionMedica.belongsToMany(Tratamiento, { 
  through: EvaluacionTratamiento, 
  foreignKey: "id_evaluacion_medica",
  otherKey: "id_tratamiento",
  uniqueKey: "eval_trat_unique"
});

Tratamiento.belongsToMany(EvaluacionMedica, { 
  through: EvaluacionTratamiento, 
  foreignKey: "id_tratamiento",
  otherKey: "id_evaluacion_medica",
  uniqueKey: "eval_trat_unique"
});

// Relacion Paciente - Alergia
Paciente.belongsToMany(Alergia, { 
  through: PacienteAlergia, 
  foreignKey: 'id_paciente',
  otherKey: 'id_alergia',
  as: 'alergias'
});

Alergia.belongsToMany(Paciente, { 
  through: PacienteAlergia, 
  foreignKey: 'id_alergia',
  otherKey: 'id_paciente',
  as: 'pacientes'
});

// Relacion Antecedente - Paciente
Paciente.belongsToMany(Antecedente, { 
  through: PacienteAntecedente, 
  foreignKey: 'id_paciente',
  otherKey: 'id_antecedente',
  as: 'antecedentes'
});

Antecedente.belongsToMany(Paciente, { 
  through: PacienteAntecedente, 
  foreignKey: 'id_antecedente',
  otherKey: 'id_paciente',
  as: 'pacientes'
});

// Relación Médico - Usuario
Usuario.hasOne(Medico, { foreignKey: "id_usuario" });
Medico.belongsTo(Usuario, { foreignKey: "id_usuario" });

// Relación Medico - EvaluacionMedica
Medico.hasMany(EvaluacionMedica, { foreignKey: "id_medico" });
EvaluacionMedica.belongsTo(Medico, { foreignKey: "id_medico" });

// Relación Admision - TipoIngreso
TipoIngreso.hasMany(Admision, { foreignKey: "id_tipo" });
Admision.belongsTo(TipoIngreso, { foreignKey: "id_tipo" });

// Relación Medico - Especialidad
Especialidad.hasMany(Medico, { foreignKey: "id_especialidad" });
Medico.belongsTo(Especialidad, { foreignKey: "id_especialidad" });

// Relación Medico - Guardia
Guardia.hasMany(Medico, { foreignKey: "id_guardia", as: "medicos" });
Medico.belongsTo(Guardia, { foreignKey: "id_guardia", as: "guardia" });

// Relación Habitacion - Cama
Habitacion.hasMany(Cama, { foreignKey: "id_habitacion" });
Cama.belongsTo(Habitacion, { foreignKey: "id_habitacion" });

// Relación Ala - Habitacion
Ala.hasMany(Habitacion, { foreignKey: "id_ala" });
Habitacion.belongsTo(Ala, { foreignKey: "id_ala" });

// Relación Admision - AsignacionDormitorio
Admision.hasMany(AsignacionDormitorio, { foreignKey: "id_admision" });
AsignacionDormitorio.belongsTo(Admision, { foreignKey: "id_admision" });

// Relación Cama - AsignacionDormitorio
Cama.hasMany(AsignacionDormitorio, { foreignKey: "id_cama" });
AsignacionDormitorio.belongsTo(Cama, { foreignKey: "id_cama" });

// Relación Paciente - HistorialMedico
Paciente.hasMany(HistorialMedico, { foreignKey: "id_paciente" });
HistorialMedico.belongsTo(Paciente, { foreignKey: "id_paciente" });

// Relación Rol - Usuario
Rol.hasMany(Usuario, { foreignKey: "id_rol", as: "usuarios" });

// Relación Usuario - Rol
Usuario.belongsTo(Rol, { foreignKey: "id_rol", as: "rol" });