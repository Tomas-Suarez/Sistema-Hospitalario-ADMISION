const parseRegistroFromBody = (body, id_enfermero) => ({
  id_admision: parseInt(body.id_admision),
  id_enfermero: id_enfermero,
  id_tratamiento: parseInt(body.id_tratamiento),
  observaciones: body.observaciones ? body.observaciones.trim() : null
});

module.exports = { parseRegistroFromBody };