const AlergiaResponseDTO = require("./AlergiaResponseDTO");
const AntecedenteResponseDTO = require("./AntecedenteResponseDTO");

class PacienteResponseDTO {
  constructor({
    id_paciente,
    nombre,
    apellido,
    documento,
    telefono,
    fecha_nacimiento,
    domicilio,
    genero,
    estatura,
    peso,
    estado,
    seguro,
    alergias,
    antecedentes,
    contactos
  }) {
    this.id_paciente = id_paciente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.domicilio = domicilio;
    this.genero = genero;
    this.estatura = estatura;
    this.peso = peso;
    this.estado = estado;
    this.nombre_seguro = seguro?.nombre || null;

    this.alergias = (alergias && Array.isArray(alergias)) 
      ? alergias.map(a => new AlergiaResponseDTO(a)) 
      : [];

    this.antecedentes = (antecedentes && Array.isArray(antecedentes))
      ? antecedentes.map(ant => new AntecedenteResponseDTO(ant))
      : [];

    this.contactos = (contactos && Array.isArray(contactos))
      ? contactos.map(c => ({
          nombre_completo: c.nombre_completo,
          telefono: c.telefono
        }))
      : [];
  }
}

module.exports = PacienteResponseDTO;