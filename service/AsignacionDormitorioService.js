const AsignacionDormitorio = require("../models/AsignDormitorioModels");
const Cama = require("../models/CamaModels");
const Paciente = require("../models/PacienteModels");
const Habitacion = require("../models/HabitacionModels");
const Ala = require("../models/AlaModels");
const Admision = require("../models/AdmisionModels");

const AsignacionDormitorioMapper = require("../mappers/AsignacionDormitorioMapper");

const ResourceNotFoundException = require("../exceptions/ResourceNotFoundException");

const {
  ERROR_SIN_CAMAS_LIBRES,
} = require("../constants/AsignacionDormitorioConstants");

const getAsignacionesActuales = async () => {
  const asignaciones = await AsignacionDormitorio.findAll({
    where: { fecha_fin: null },
    include: [
      {
        model: Admision,
        as: 'Admision',
        where: { fecha_salida: null },
        include: [
          {
            model: Paciente,
            as: 'Paciente',
            attributes: ["id_paciente", "documento", "nombre", "apellido"],
          }
        ]
      },
      {
        model: Cama,
        as: 'Cama',
        attributes: ["id_cama", "numero", "libre", "higienizada"],
        include: [
          {
            model: Habitacion,
            as: 'Habitacion',
            attributes: ["id_habitacion", "numero"],
            include: [
              {
                model: Ala,
                as: 'Ala',
                attributes: ["id_ala", "nombre"],
              }
            ]
          }
        ]
      }
    ]
  });

  return asignaciones.map(AsignacionDormitorioMapper.toDto);
};

//Asignamos un dormitorio al paciente
const createAsignacionDormitorio = async (datos) => {
    // Buscamos la primera cama que este libre en la habitacion, si esta ocupada la primera, se le asignara la segunda
    const buscarCamaLibre = await Cama.findOne({
      where: {
        id_habitacion: datos.id_habitacion,
        libre: true,
        higienizada: true,
      },
    });

    // Verificamos que se encuentre una cama libre
    if (!buscarCamaLibre) {
      throw new ResourceNotFoundException(ERROR_SIN_CAMAS_LIBRES);
    }

    // Le asignamos un dormitorio a un paciente
    const asignacionEntity = await AsignacionDormitorioMapper.toEntity({
      id_admision: datos.id_admision,
      id_cama: buscarCamaLibre.id_cama,
      fecha_inicio: new Date(),
    });

    const asignacion = await asignacionEntity.save();

    //Luego de asignar la habitacion, le actualizamos el estado a la cama
    await Cama.update(
      {
        libre: false,
      },
      {
        where: {
          id_cama: buscarCamaLibre.id_cama,
        },
      }
    );

    return {
      asignacion: AsignacionDormitorioMapper.toDto(asignacion),
      creado: true,
    };
};

// TODO: Falta cambio de habitacion

module.exports = {
  createAsignacionDormitorio,
  getAsignacionesActuales,
};
