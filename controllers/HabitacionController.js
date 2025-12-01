const HabitacionService = require("../service/HabitacionService");
const CamaService = require("../service/CamaService");

// Controlador para ovtener todas las habitaciones con sus camas
const getHabitaciones = async (req, res, next) => {
  try {
    const habitaciones = await HabitacionService.getAllHabitaciones();
    res.render("Habitaciones/ListaHabitacion", { habitaciones });
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener las habitaciones filtradas por ala y genero del paciente ocupante y el ingresante
// Aca pasamos a JSON, porque hacemos un fetch para cuando se seleccione un ala en especifica filtre
const getHabitacionesPorAlaYGenero = async (req, res) => {
  const { alaId, pacienteId } = req.query;

  if (!alaId || !pacienteId) {
    return res
      .status(400)
      .json({ error: "Faltan datos: alaId y pacienteId son requeridos" });
  }

  try {
    const habitaciones =
      await HabitacionService.getHabitacionesFiltradasPorAlaYGenero(
        alaId,
        pacienteId
      );
    res.json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    res.status(500).json({ error: "Error al obtener habitaciones" });
  }
};

const higienizarCama = async (req, res, next) => {
  try {
    const { id_cama } = req.params;
    
    await CamaService.higienizarCama(id_cama);

    res.redirect("/habitaciones/ListaHabitacion");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHabitaciones,
  getHabitacionesPorAlaYGenero,
  higienizarCama
};
