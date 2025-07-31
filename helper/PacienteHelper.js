const parsePacienteFromBody = (body, id_paciente = null) => ({
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
  id_seguro: body.id_seguro === "null" || body.id_seguro === "" ? null : parseInt(body.id_seguro),
});

module.exports = {
    parsePacienteFromBody
}