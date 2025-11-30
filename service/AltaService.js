const sequelize = require("../models/db");

const AltaHospitalaria = require("../models/AltaHospitalariaModels");
const Admision = require("../models/AdmisionModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");

const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const InvalidStateException = require("../exceptions/InvalidStateException"); 

const { ADMISION_NO_ENCONTRADA_POR_ID, ADMISION_YA_DADA_EN_ALTA } = require("../constants/AdmisionConstants");

const procesarAlta = async ({ id_admision, id_motivo_alta, detalles }) => {
  const admision = await Admision.findByPk(id_admision);

  if (!admision) {
    throw new ResourceNotFoundException(ADMISION_NO_ENCONTRADA_POR_ID);
  }

  if (!admision.estado) {
    throw new InvalidStateException(ADMISION_YA_DADA_EN_ALTA);
  }

  await sequelize.transaction(async (t) => {
    
    await AltaHospitalaria.create({
      id_motivo_alta,
      detalles: detalles || "Alta médica",
    }, { transaction: t });

    // Cerrar Admisión
    admision.fecha_salida = new Date();
    admision.estado = false;
    await admision.save({ transaction: t });

    // Buscar asignación
    const asignacion = await AsignacionDormitorio.findOne({
      where: { 
        id_admision, 
        fecha_fin: null 
      },
      transaction: t
    });

    // Liberar cama y marcar para la limpieza
    if (asignacion) {
      asignacion.fecha_fin = new Date();
      await asignacion.save({ transaction: t });

      await Cama.update(
        { 
          libre: true, 
          higienizada: false 
        },
        { 
          where: { id_cama: asignacion.id_cama }, 
          transaction: t 
        }
      );
    }
  });
  
  return true;
};

module.exports = { 
  procesarAlta 
};