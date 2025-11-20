const parseEnfermeroFromBody = (body, id_enfermero = null) => ({
  id_enfermero,
  nombre: body.nombre,
  apellido: body.apellido,
  documento: body.documento,
  genero: body.genero,
  matricula: body.matricula,
  id_guardia:
    body.id_guardia === "null" || body.id_guardia === ""
      ? null
      : parseInt(body.id_guardia),
  estado: body.estado === undefined ? true : body.estado === "true",
});

module.exports = { parseEnfermeroFromBody };
