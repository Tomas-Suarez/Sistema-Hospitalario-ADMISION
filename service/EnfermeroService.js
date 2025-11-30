const Enfermero = require("../models/EnfermeroModels");
const Guardia = require("../models/GuardiaModels");
const EnfermeroMapper = require("../mappers/EnfermeroMapper");
const { Op } = require("sequelize");
const DuplicatedResourceException = require("../exceptions/DuplicatedResourceException");
const {
  MATRICULA_YA_EXISTENTE,
  DNI_YA_EXISTENTE,
  ENFERMERO_NO_ENCONTRADO_POR_ID,
  ENFERMERO_DNI_EXISTENTE_UPDATE,
  ENFERMERO_MATRICULA_EXISTENTE_UPDATE,
} = require("../constants/EnfermeroConstants");

const Usuario = require("../models/UsuarioModels");

const getAllEnfermeros = async () => {
    const enfermeros = await Enfermero.findAll({
      include: [
        {
          model: Guardia,
          as: "guardia",
          attributes: ["id_guardia", "nombre"],
        },
      ],
    });
    return enfermeros.map(EnfermeroMapper.toDto);
};

const createEnfermero = async (enfermeroRequestDTO) => {
  
  const enfermeroEntity = EnfermeroMapper.toEntity(enfermeroRequestDTO);

   const existeMatricula = await Enfermero.findOne({
      where: { matricula: enfermeroEntity.matricula },
    });

    if (existeMatricula) {
      throw new DuplicatedResourceException(MATRICULA_YA_EXISTENTE);
    }

    const existeDocumento = await Enfermero.findOne({
      where: { documento: enfermeroEntity.documento },
    });

    if(existeDocumento) {
      throw new DuplicatedResourceException(DNI_YA_EXISTENTE)
    }

    const enfermero = await Enfermero.create({
      nombre: enfermeroEntity.nombre,
      apellido: enfermeroEntity.apellido,
      genero: enfermeroEntity.genero,
      documento: enfermeroEntity.documento,
      matricula: enfermeroEntity.matricula,
      id_guardia: enfermeroEntity.id_guardia,
      estado: enfermeroEntity.estado,
      id_usuario: enfermeroRequestDTO.id_usuario 
    });

    return {
      enfermero: EnfermeroMapper.toDto(enfermero),
      creado: true
    };

};

const updateEnfermero = async (enfermeroRequestDTO) => {
    
    const enfermero = await Enfermero.findByPk(enfermeroRequestDTO.id_enfermero);

    if (!enfermero) {
      throw new ResourceNotFoundException(
        ENFERMERO_NO_ENCONTRADO_POR_ID + enfermeroRequestDTO.id_enfermero
      );
    }

    const otroEnfermeroConMismoDNI = await Enfermero.findOne({
      where: {
        documento: enfermeroRequestDTO.documento,
        id_enfermero: { [Op.ne]: enfermeroRequestDTO.id_enfermero },
      },
    });

    if (otroEnfermeroConMismoDNI) {
      throw new DuplicatedResourceException(ENFERMERO_DNI_EXISTENTE_UPDATE);
    }

    const otroEnfermeroConMismaMatricula = await Enfermero.findOne({
      where: {
        matricula: enfermeroRequestDTO.matricula,
        id_enfermero: { [Op.ne]: enfermeroRequestDTO.id_enfermero },
      },
    });

    if (otroEnfermeroConMismaMatricula) {
      throw new DuplicatedResourceException(ENFERMERO_MATRICULA_EXISTENTE_UPDATE);
    }

    EnfermeroMapper.updateEntityFromDto(enfermeroRequestDTO, enfermero);
    await enfermero.save();

    return EnfermeroMapper.toDto(enfermero);
};

const changeStatusEnfermero = async ({ id_enfermero, estado }) => {
    const [actualizado] = await Enfermero.update(
      { estado },
      { where: { id_enfermero } }
    );

    if (actualizado === 0) {
      throw new ResourceNotFoundException(ENFERMERO_NO_ENCONTRADO_POR_ID + id_enfermero);
    }
    
    return { actualizado: true };
};

const getEnfermeroByUsuarioId = async (id_usuario) => {
  const enfermero = await Enfermero.findOne({ where: { id_usuario } });
  
  if (!enfermero) {
    throw new ResourceNotFoundException(PERFIL_NO_ENCONTRADO);
  }
  
  return EnfermeroMapper.toDto(enfermero);
};

module.exports = {
  getAllEnfermeros,
  createEnfermero,
  updateEnfermero,
  changeStatusEnfermero,
  getEnfermeroByUsuarioId
};
