const GuardiaResponseDTO = require("./GuardiaResponseDTO"); 

class MedicoResponseDTO {
  constructor({
    id_medico,
    nombre,
    apellido,
    documento,
    telefono,
    genero,
    matricula,
    estado,
    especialidad,
    guardia
  }) {
    this.id_medico = id_medico;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.telefono = telefono;
    this.genero = genero;
    this.matricula = matricula;
    this.estado = estado;
    
    this.nombre_especialidad = especialidad?.nombre || null;

    this.guardia = guardia && guardia.id_guardia ? new GuardiaResponseDTO(guardia) : null;
  }
}

module.exports = MedicoResponseDTO;