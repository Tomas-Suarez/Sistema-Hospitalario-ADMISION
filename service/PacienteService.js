// Importamos modelos
const Paciente = require("../models/PacienteModels");
const SeguroMedico = require("../models/SeguroMedicoModels");
const PacienteMapper = require("../mappers/PacienteMapper");
const { Op } = require("sequelize");
const DuplicatedResourceException = require("../exceptions/DuplicatedResourceException");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const {
  PACIENTE_NN,
  ERROR_DNI_EXISTENTE_UPDATE,
  PACIENTE_NO_ENCONTRADO_POR_ID,
  PACIENTE_NO_ENCONTRADO_POR_DOCUMENTO,
  ERROR_DNI_EXISTENTE_CREATE,
} = require("../constants/PacienteConstants");

const Alergia = require("../models/AlergiaModels");
const Antecedente = require("../models/AntecedenteModels");

// Nos permite obtener todos los pacientes, incluyendo el seguro medico
const getAllPacientes = async () => {
  const pacientes = await Paciente.findAll({
    where: {
      id_paciente: { [Op.ne]: PACIENTE_NN },
    },
    include: {
      model: SeguroMedico,
      attributes: ["id_seguro", "nombre"],
    },
  });

  return pacientes.map(PacienteMapper.toDto);
};

// Nos permite obtener solamente los pacientes que se encuentran activos
const getAllPacientesActivos = async () => {
  const pacientes = await Paciente.findAll({
    where: { estado: true },
    include: {
      model: SeguroMedico,
      attributes: ["id_seguro", "nombre"],
    },
  });

  return pacientes.map(PacienteMapper.toDto);
};

// Nos permite crear un paciente, solamente si no existe otro paciente con el mismo DNI
const createPaciente = async (pacienteRequestDTO) => {
  const pacienteEntity = PacienteMapper.toEntity(pacienteRequestDTO);

  const [paciente, creado] = await Paciente.findOrCreate({
    where: { documento: pacienteEntity.documento },
    defaults: pacienteEntity.get(),
  });

  if (!creado) {
    throw new DuplicatedResourceException(
      ERROR_DNI_EXISTENTE_CREATE + pacienteRequestDTO.documento
    );
  }

  return {
    paciente: PacienteMapper.toDto(paciente),
    creado,
  };
};

// Nos permite actualizar un paciente mediante su ID
const updatePaciente = async (pacienteRequestDTO) => {
  const paciente = await Paciente.findByPk(pacienteRequestDTO.id_paciente);

  if (!paciente) {
    throw new ResourceNotFoundException(
      PACIENTE_NO_ENCONTRADO_POR_ID + pacienteRequestDTO.id_paciente
    );
  }

  const otroPacienteConMismoDNI = await Paciente.findOne({
    where: {
      documento: pacienteRequestDTO.documento,
      id_paciente: { [Op.ne]: pacienteRequestDTO.id_paciente },
    },
  });

  if (otroPacienteConMismoDNI) {
    throw new DuplicatedResourceException(
      ERROR_DNI_EXISTENTE_UPDATE + pacienteRequestDTO.documento
    );
  }

  PacienteMapper.updateEntityFromDto(pacienteRequestDTO, paciente);
  await paciente.save();

  return { paciente: PacienteMapper.toDto(paciente), actualizado: true };
};

// Nos permite cambiar el estado de un paciente (TRUE, FALSE)
const changeStatusPaciente = async ({ id_paciente, estado }) => {
  const [actualizado] = await Paciente.update(
    { estado },
    { where: { id_paciente } }
  );

  if (actualizado === 0) {
    throw new ResourceNotFoundException(
      PACIENTE_NO_ENCONTRADO_POR_ID + id_paciente
    );
  }

  return { actualizado: true };
};

// Nos permite obtener un paciente mediante su documento(DNI)
const getPacienteByDNI = async (documento) => {
  const paciente = await Paciente.findOne({
    where: { documento: documento },
    include: [
      { model: SeguroMedico },
      { model: Alergia, as: "alergias" },
      { model: Antecedente, as: "antecedentes" },
    ],
  });

  if (!paciente) {
    throw new ResourceNotFoundException(
      PACIENTE_NO_ENCONTRADO_POR_DOCUMENTO + documento
    );
  }

  return PacienteMapper.toDto(paciente);
};

// Nos permite obtener un paciente mediante su ID
const getPacienteById = async (id_paciente) => {
  const paciente = await Paciente.findByPk(id_paciente, {
    include: [
      { model: SeguroMedico, attributes: ["id_seguro", "nombre"] },
      { model: Alergia, as: "alergias" },
      { model: Antecedente, as: "antecedentes" },
    ],
  });

  if (!paciente) {
    throw new ResourceNotFoundException(
      PACIENTE_NO_ENCONTRADO_POR_ID + id_paciente
    );
  }

  return PacienteMapper.toDto(paciente);
};

const updateHistoriaClinica = async (id_paciente, datos) => {
  const paciente = await Paciente.findByPk(id_paciente);

  if (!paciente) {
    throw new ResourceNotFoundException(
      PACIENTE_NO_ENCONTRADO_POR_ID + id_paciente
    );
  }

  if (datos.alergias) {
    await paciente.setAlergias(datos.alergias);
  }

  if (datos.antecedentes) {
    await paciente.setAntecedentes(datos.antecedentes);
  }

  return PacienteMapper.toDto(paciente);
};

module.exports = {
  getAllPacientes,
  getAllPacientesActivos,
  createPaciente,
  updatePaciente,
  changeStatusPaciente,
  getPacienteByDNI,
  getPacienteById,
  updateHistoriaClinica,
};
