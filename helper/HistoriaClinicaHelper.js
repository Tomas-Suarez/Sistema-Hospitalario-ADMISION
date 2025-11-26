const parseHistoriaFromBody = (body) => {
  
  const parseIds = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map(id => parseInt(id, 10));
    }
    return [parseInt(value, 10)];
  };

  return {
    id_paciente: parseInt(body.id_paciente, 10),
    alergias: parseIds(body.alergias),
    antecedentes: parseIds(body.antecedentes),
    documento: body.documento_hidden || body.documento
  };
};

module.exports = { parseHistoriaFromBody };