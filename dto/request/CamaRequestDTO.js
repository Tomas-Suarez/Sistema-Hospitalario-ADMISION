class CamaRequestDTO {
  constructor({
    id_cama,
    id_habitacion,
    libre,
    higienizada,
    numero,
  }) {
    this.id_cama = id_cama;
    this.id_habitacion = id_habitacion;
    this.libre = libre;
    this.higienizada = higienizada;
    this.numero = numero;
  }
}

module.exports = CamaRequestDTO;