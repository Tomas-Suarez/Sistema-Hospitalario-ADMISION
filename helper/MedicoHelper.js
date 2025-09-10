const parseMedicoFromBody = (body, id_medico = null) => ({
  id_medico,
  nombre: body.nombre,
  apellido: body.apellido,
  documento: body.documento,
  telefono: body.telefono || null,
  genero: body.genero,
  matricula: body.matricula,
  id_especialidad:
    body.id_especialidad === "null" || body.id_especialidad === ""
      ? null
      : parseInt(body.id_especialidad),
  id_guardia:
    body.id_guardia === "null" || body.id_guardia === ""
      ? null
      : parseInt(body.id_guardia),
  estado: body.estado === undefined ? true : body.estado === "true",
});

module.exports = { parseMedicoFromBody };
