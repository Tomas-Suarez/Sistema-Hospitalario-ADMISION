const Admision = require("../models/AdmisionModels");
const TipoIngreso = require("../models/TipoIngresoModels");
const Paciente = require("../models/PacienteModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Motivo = require("../models/MotivoAdmisionModels");
const AdmisionMapper = require("../mappers/AdmisionMapper");
const { PACIENTE_NN } = require("../constants/PacienteConstants");
const DuplicatedResourceException = require("../exceptions/DuplicatedResourceException");
const {
  ERROR_ADMISION_EXISTENTE,
  ADMISION_NO_ENCONTRADA_POR_ID,
} = require("../constants/ErrorConstants");

const {
  PACIENTE_NO_ENCONTRADO_POR_ID,
  PACIENTE_INACTIVO_PARA_ADMISION,
} = require("../constants/PacienteConstants");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const { getPacienteById } = require("./PacienteService");
const InactivePatientException = require("../exceptions/InactivePatientException");
const MotivoAdmision = require("../models/MotivoAdmisionModels");
const Cama = require("../models/CamaModels");
const Habitacion = require("../models/HabitacionModels");
const Ala = require("../models/AlaModels");

//Obtenemos todas las admisiones - incluyendo los datos de "Ingreso" y algunos de "Paciente"
const getAllAdmisiones = async () => {
  const admisiones = await Admision.findAll({
    where: {
      estado: true,
    },
    include: [
      {
        model: Motivo,
        attributes: ["id_motivo", "descripcion"],
      },
      {
        model: TipoIngreso,
        attributes: ["id_tipo", "descripcion"],
      },
      {
        model: Paciente,
        attributes: ["id_paciente", "nombre", "apellido", "documento"],
      },
      {
        model: AsignacionDormitorio,
        required: false,
      },
    ],
  });

  // Filtrar solo las admisiones que no tienen ninguna asignación
  const sinAsignacion = admisiones.filter(
    (admision) => admision.AsignacionDormitorios.length === 0
  );

  return sinAsignacion.map(AdmisionMapper.toDto);
};

// Control para ver si tenemos una admision activa, para evitar duplicados
const getAdmisionActivaByPaciente = async (id_paciente) => {
  const admisionActiva = await Admision.findOne({
    where: {
      id_paciente,
      estado: true,
    },
    include: [
      { model: Paciente },
      { model: MotivoAdmision },
      {
        model: AsignacionDormitorio,
        required: false,
        where: { fecha_fin: null },
        include: [
          {
            model: Cama,
            include: [{ model: Habitacion, include: [Ala] }],
          },
        ],
      },
    ],
  });

  return AdmisionMapper.toDto(admisionActiva);
};

// Crea la admision
const createAdmision = async (datos) => {
  //Si no es paciente NN, revisa si existe una admision activa

  const pacienteExistente = await getPacienteById(datos.id_paciente);

  if (!pacienteExistente) {
    throw new ResourceNotFoundException(PACIENTE_NO_ENCONTRADO_POR_ID);
  }

  if (!pacienteExistente.estado) {
    throw new InactivePatientException(PACIENTE_INACTIVO_PARA_ADMISION);
  }

  if (datos.id_paciente !== PACIENTE_NN) {
    const admisionExistente = await getAdmisionActivaByPaciente(
      datos.id_paciente
    );
    if (admisionExistente) {
      throw new DuplicatedResourceException(ERROR_ADMISION_EXISTENTE);
    }
  }

  // Crear la admisión
  const admisionEntity = AdmisionMapper.toEntity(datos);
  const admision = await admisionEntity.save();

  return {
    admision: AdmisionMapper.toDto(admision),
    creado: true,
  };
};

// Cancelamos una admision - Cambiamos el estado booleano, a false
const darDeBajaAdmision = async (id_admision) => {
  const [actualizado] = await Admision.update(
    { estado: false },
    { where: { id_admision } }
  );

  if (actualizado === 0) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }
};

const getAdmisionById = async (id_admision) => {
  const admision = await Admision.findByPk(id_admision, {
    include: [
      { model: Paciente },
      { model: MotivoAdmision },
      { 
        model: AsignacionDormitorio,
        required: false,
        where: { fecha_fin: null },
        include: [
            {
                model: Cama,
                include: [
                    { 
                        model: Habitacion,
                        include: [{ model: Ala }]
                    }
                ]
            }
        ]
      }
    ]
  });

  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID); 
  }
  return AdmisionMapper.toDto(admision);
};

const getHistorialPorPaciente = async (id_paciente) => {
  const admisiones = await Admision.findAll({
    where: { id_paciente },
    include: [
      { model: Motivo, attributes: ["descripcion"] },
      { model: TipoIngreso, attributes: ["descripcion"] },
    ],
    order: [["fecha_entrada", "DESC"]],
  });

  return admisiones.map(AdmisionMapper.toDto);
};

module.exports = {
  getAllAdmisiones,
  createAdmision,
  darDeBajaAdmision,
  getAdmisionById,
  getHistorialPorPaciente,
  getAdmisionActivaByPaciente,
};
