const GuardiaResponseDTO = require("./GuardiaResponseDTO");

class EnfermeroResponseDTO {
  constructor({
    id_enfermero,
    nombre,
    apellido,
    documento,
    genero,
    matricula,
    estado,
    id_guardia,
    guardia
  }) {
    this.id_enfermero = id_enfermero;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.genero = genero;
    this.matricula = matricula;
    this.estado = estado;
    this.id_guardia = id_guardia;    
    this.guardia = (guardia && guardia.id_guardia) ? new GuardiaResponseDTO(guardia) : null;
  }
}

module.exports = EnfermeroResponseDTO;