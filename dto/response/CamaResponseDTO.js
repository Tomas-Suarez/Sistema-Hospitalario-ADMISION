const HabitacionResponseDTO = require("../response/HabitacionResponseDTO");

class CamaResponseDTO {
  constructor({
    id_cama,
    numero,
    libre,
    higienizada,
    habitacion,
  }) {
    this.id_cama = id_cama;
    this.numero = numero;
    this.libre = libre;
    this.higienizada = higienizada;
    this.habitacion = habitacion ? new HabitacionResponseDTO(habitacion) : null;
  }
}

module.exports = CamaResponseDTO;
