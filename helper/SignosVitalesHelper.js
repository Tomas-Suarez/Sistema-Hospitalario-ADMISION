const parseSignosFromBody = (body, id_enfermero) => ({
  id_admision: parseInt(body.id_admision),
  id_enfermero: id_enfermero,
  temperatura: parseFloat(body.temperatura),
  presion_arterial: body.presion_arterial,
  frecuencia_cardiaca: parseInt(body.frecuencia_cardiaca),
  frecuencia_respiratoria: body.frecuencia_respiratoria ? parseInt(body.frecuencia_respiratoria) : null,
  saturacion_oxigeno: body.saturacion_oxigeno ? parseInt(body.saturacion_oxigeno) : null,
  observaciones: body.observaciones ? body.observaciones.trim() : null
});

module.exports = { parseSignosFromBody };