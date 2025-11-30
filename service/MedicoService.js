const Medico = require("../models/MedicoModels");
const Guardia = require("../models/GuardiaModels");
const Especialidad = require("../models/EspecialidadModels");
const MedicoMapper = require("../mappers/MedicoMapper");
const { Op } = require("sequelize");
const {
  MATRICULA_YA_EXISTENTE,
  MEDICO_NO_ENCONTRADO_POR_ID,
  MEDICO_DNI_EXISTENTE_UPDATE,
  MEDICO_MATRICULA_EXISTENTE_UPDATE,
  PERFIL_NO_ENCONTRADO,
} = require("../constants/MedicoConstants");
const DuplicatedResourceException = require("../exceptions/DuplicatedResourceException");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");

const getAllMedicos = async () => {
    const medicos = await Medico.findAll({
      include: [
        {
          model: Especialidad,
          attributes: ["id_especialidad", "nombre"],
        },
        {
          model: Guardia,
          as: "guardia",
          attributes: ["id_guardia", "nombre"],
        },
      ],
    });

    return medicos.map(MedicoMapper.toDto);
};

const createMedico = async (medicoRequestDTO) => {

    const medicoEntity = MedicoMapper.toEntity(medicoRequestDTO);

    const existeMatricula = await Medico.findOne({
      where: { matricula: medicoEntity.matricula },
    });

    if (existeMatricula) {
      throw new DuplicatedResourceException(MATRICULA_YA_EXISTENTE);
    }

    const existeDocumento = await Medico.findOne({
      where: { documento: medicoEntity.documento },
    });

    if (existeDocumento) {
      throw new DuplicatedResourceException(DNI_YA_EXISTENTE);
    }

    const medico = await Medico.create({
      nombre: medicoEntity.nombre,
      apellido: medicoEntity.apellido,
      genero: medicoEntity.genero,
      documento: medicoEntity.documento,
      matricula: medicoEntity.matricula,
      id_especialidad: medicoEntity.id_especialidad,
      id_guardia: medicoEntity.id_guardia,
      estado: medicoEntity.estado,
      id_usuario: medicoRequestDTO.id_usuario 
    });

    return {
      medico: MedicoMapper.toDto(medico),
      creado: true
    };
};

const updateMedico = async (medicoRequestDTO) => {

    const medico = await Medico.findByPk(medicoRequestDTO.id_medico);

    if(!medico){
      throw new ResourceNotFoundException(
        MEDICO_NO_ENCONTRADO_POR_ID + medicoRequestDTO.id_medico
      );
    }

    const otroMedicoConMismoDNI = await Medico.findOne({
      where: {
        documento: medicoRequestDTO.documento,
        id_medico: { [Op.ne]: medicoRequestDTO.id_medico},
      },
    });

    if(otroMedicoConMismoDNI) {
      throw new DuplicatedResourceException(
        MEDICO_DNI_EXISTENTE_UPDATE
      );
    }

    const otroMedicoConMismaMatricula = await Medico.findOne({
      where: {
        matricula: medicoRequestDTO.matricula,
        id_medico: { [Op.ne]: medicoRequestDTO.id_medico},
      },
    });

    if(otroMedicoConMismaMatricula) {
      throw new DuplicatedResourceException(
        MEDICO_MATRICULA_EXISTENTE_UPDATE
      );
    }

    MedicoMapper.updateEntityFromDto(medicoRequestDTO, medico);
    await medico.save();

    return MedicoMapper.toDto(medico);
};

const changeStatusMedico = async ({ id_medico, estado}) => {
    const [actualizado] = await Medico.update(
      { estado },
      { where: { id_medico } }
    );

    if (actualizado === 0) {
      throw new ResourceNotFoundException(MEDICO_NO_ENCONTRADO_POR_ID + id_medico);
    }
    return { actualizado: true };
};

const getMedicoByUsuarioId = async (id_usuario) => {
  const medico = await Medico.findOne({ where: { id_usuario } });
  if (!medico) {
    throw new ResourceNotFoundException(PERFIL_NO_ENCONTRADO);
  }
  return medico;
};

module.exports = {
  getAllMedicos,
  createMedico,
  updateMedico,
  changeStatusMedico,
  getMedicoByUsuarioId
};
