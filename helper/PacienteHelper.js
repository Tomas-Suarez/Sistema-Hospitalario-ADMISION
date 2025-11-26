const parsePacienteFromBody = (body, id_paciente = null) => {
  let contactos = [];

  if (body.nombres_contacto && body.telefonos_contacto) {
    const nombres = Array.isArray(body.nombres_contacto) 
      ? body.nombres_contacto 
      : [body.nombres_contacto];
      
    const telefonos = Array.isArray(body.telefonos_contacto) 
      ? body.telefonos_contacto 
      : [body.telefonos_contacto];

    contactos = nombres.map((nom, i) => ({
      nombre_completo: nom.trim(),
      telefono: telefonos[i] ? telefonos[i].trim() : ""
    })).filter(c => c.nombre_completo && c.telefono);
  }

  return {
    id_paciente,
    nombre: body.nombre,
    apellido: body.apellido,
    documento: body.documento,
    telefono: body.telefono,
    domicilio: body.domicilio,
    fecha_nacimiento: body.fecha_nacimiento,
    genero: body.genero,
    estatura: body.estatura ? parseFloat(body.estatura) : null,
    peso: body.peso ? parseFloat(body.peso) : null,
    id_seguro: (body.id_seguro === "null" || body.id_seguro === "") ? null : parseInt(body.id_seguro),
    contactos: contactos 
  };
};

module.exports = {
    parsePacienteFromBody
};