const MedicoService = require("../service/MedicoService");
const GuardiaService = require("../service/GuardiaService");
const EspecialidadService = require("../service/EspecialidadService");
const { parseMedicoFromBody } = require("../helper/MedicoHelper");

const getAllMedico = async (req, res, next) => {
  try {
    const medicos = await MedicoService.getAllMedicos();
    const guardias = await GuardiaService.getAllGuardia();
    const especialidades = await EspecialidadService.getAllEspecialidad();

    res.render("Medicos/GestionMedicos", { medicos, guardias, especialidades });
  } catch (error) {
    next(error);
  }
};

const createMedico = async (req, res, next) => {
  try {

    const datos = parseMedicoFromBody(req.body);
    await MedicoService.createMedico(datos);
    return res.redirect("/medicos/GestionMedico");
  } catch (error) {
    next(error);
  }
};

const updateMedico = async (req, res, next) => {
  try {
    const id_medico = parseInt(req.params.id);
    const datos = parseMedicoFromBody(req.body);
    await MedicoService.updateMedico(datos);

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    next(error);
  }
};

const changeStatusMedico = async (req, res, next) => {
  try {
    const id_medico = parseInt(req.params.id);
    const estado = req.body.estado === 'true';
    await MedicoService.changeStatusMedico( { id_medico, estado });

    res.redirect("/medicos/GestionMedico/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedico,
  createMedico,
  updateMedico,
  changeStatusMedico,
};
