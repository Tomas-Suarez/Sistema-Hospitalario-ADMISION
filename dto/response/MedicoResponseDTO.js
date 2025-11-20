const GuardiaResponseDTO = require("./GuardiaResponseDTO");

class MedicoResponseDTO {
  constructor({
    id_medico,
    nombre,
    apellido,
    documento,
    genero,
    matricula,
    estado,
    id_especialidad, 
    id_guardia,
    especialidad,
    guardia
  }) {
    this.id_medico = id_medico;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.genero = genero;
    this.matricula = matricula;
    this.estado = estado;
    this.id_especialidad = id_especialidad;
    this.id_guardia = id_guardia;    
    this.nombre_especialidad = especialidad?.nombre || "Sin Especialidad";
    this.guardia = (guardia && guardia.id_guardia) ? new GuardiaResponseDTO(guardia) : null;
  }
}

module.exports = MedicoResponseDTO;