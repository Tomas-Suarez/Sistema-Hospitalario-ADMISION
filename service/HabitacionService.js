const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");
const Ala = require("../models/AlaModels");
const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Admision = require("../models/AdmisionModels");
const Paciente = require("../models/PacienteModels");
const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");
const { PACIENTE_NO_ENCONTRADO_POR_ID } = require("../constants/PacienteConstants");

// Obtenemos todas las habitaciones con sus respectivas camas
const getAllHabitaciones = async () => {
    const habitaciones = await Habitacion.findAll({
      attributes: ["numero", "capacidad"],
      include: [
        {
          model: Ala,
          attributes: ["nombre"],
        },
        {
          model: Cama,
          attributes: ["id_cama", "numero", "libre", "higienizada"], 
          include: [
            {
              model: AsignacionDormitorio,
              required: false,
              where: { fecha_fin: null },
              include: [
                {
                  model: Admision,
                  include: [
                    {
                      model: Paciente,
                      attributes: ["nombre", "apellido"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [
        ['numero', 'ASC'], 
        [Cama, 'numero', 'ASC']
      ] 
    });

    return habitaciones;
};

// Filtramos las habitaciones segun el genero del paciente y el ala seleccionada.
const getHabitacionesFiltradasPorAlaYGenero = async (alaId, pacienteId) => {
  try {
    // Obtenemos el paciente por id
    const paciente = await Paciente.findByPk(pacienteId);

    if (!paciente) {
      throw new ResourceNotFoundException(
        PACIENTE_NO_ENCONTRADO_POR_ID + pacienteId
      );
    }

    // Pasamos el genero del paciente a una variable, para que sea mas legible
    const generoPaciente = paciente.genero;

    // Juntamos las tablas - JOIN
    const habitaciones = await Habitacion.findAll({
      where: { id_ala: alaId },
      attributes: ["id_habitacion", "numero", "capacidad"],
      include: [
        {
          model: Ala,
          attributes: ["nombre"],
        },
        {
          model: Cama,
          attributes: ["id_cama", "libre", "higienizada"],
          include: [
            {
              model: AsignacionDormitorio,
              include: [
                {
                  model: Admision,
                  where: { estado: true },
                  required: false,
                  include: [
                    {
                      model: Paciente,
                      attributes: ["genero"],
                      required: false,
                    },
                  ],
                },
              ],
              required: false,
            },
          ],
        },
      ],
    });

    // Filtramos las habitaciones
    // - Si esta ocupadas las dos camas de la habitacion
    // - Si hay un paciente internado en una cama, entonces el paciente el cual queremos internar debe ser del mismo genero
    const habitacionFiltrada = habitaciones.filter((habitacion) => {
      const camas = habitacion.Camas || [];

      // Filtramos las camas libre e higienizadas
      const camasDisponiblesHigienizadas = camas.filter(
        (c) => c.libre && c.higienizada
      );

      // Las camas deben estar libre e higienizadas, en caso contrario las descartamos
      if (camasDisponiblesHigienizadas.length === 0) {
        return false;
      }

      // Obtenemos las camas ocupadas
      const camasOcupadas = camas.filter((c) => !c.libre);

      // Si estan todas las camas ocupadas, entonces no me va a figurar la habitacion
      if (camasOcupadas.length === camas.length) {
        return false;
      }

      // Si estan las 2 camas desocupadas, entonces si me va a figurar
      if (camasOcupadas.length === 0) {
        return true;
      }

      // Obtenemos el genero de los pacientes que se encuentran ocupando las camas
      const generosOcupantes = camasOcupadas.map((cama) => {
        const asignaciones = cama.AsignacionDormitorios || [];
        const asignacion = asignaciones.find(
          (a) => a?.Admision?.estado === true
        );
        return asignacion?.Admision?.Paciente?.genero;
      });

      // Evaluar si todos coinciden con el género del paciente
      for (let i = 0; i < generosOcupantes.length; i++) {
        if (!generosOcupantes[i] || generosOcupantes[i] !== generoPaciente) {
          return false;
        }
      }

      return true;
    });

    return habitacionFiltrada;
  } catch (error) {
    throw new Error(
      "Error al obtener habitaciones filtradas: " + error.message
    );
  }
};

//Obtenemos todas las habitciones de emergencia, por el id del ala
const getHabitacionesEmergencia = async (alaId) => {
  const habitaciones = await Habitacion.findAll({
    where: { id_ala: alaId },
    include: [
      {
        model: Cama,
        where: {
          libre: true,
          higienizada: true,
        },
        attributes: ["id_cama", "libre", "higienizada"],
      },
    ],
    attributes: ["id_habitacion", "numero", "capacidad"],
  });
  return habitaciones;
};

module.exports = {
  getAllHabitaciones,
  getHabitacionesFiltradasPorAlaYGenero,
  getHabitacionesEmergencia,
};
