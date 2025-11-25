const AltaHospitalaria = require("../models/AltaHospitalariaModels");
const Admision = require("../models/AdmisionModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");
const sequelize = require("../models/db");

const procesarAlta = async ({ id_admision, id_motivo_alta, detalles }) => {
  const t = await sequelize.transaction();
  
  try {
    await AltaHospitalaria.create({
      id_motivo_alta,
      detalles: detalles || "Alta médica",
    }, { transaction: t });

    await Admision.update(
      { 
        fecha_salida: new Date(), 
        estado: false 
      },
      { where: { id_admision }, transaction: t }
    );

    const asignacion = await AsignacionDormitorio.findOne({
      where: { id_admision, fecha_fin: null }
    });

    if (asignacion) {
      await asignacion.update({ fecha_fin: new Date() }, { transaction: t });

      await Cama.update(
        { libre: true, higienizada: false }, 
        { where: { id_cama: asignacion.id_cama }, transaction: t }
      );
    }

    await t.commit();
    return true;

  } catch (error) {
    await t.rollback();
    throw new Error("Error al procesar el alta: " + error.message);
  }
};

module.exports = { procesarAlta };