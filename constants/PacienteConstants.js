const PacienteConstants = {
    PACIENTE_NN: 1, // id del paciente NN
    
    PACIENTE_NO_ENCONTRADO_POR_ID: "No se encontró ningun paciente!",
    PACIENTE_NO_ENCONTRADO_POR_DOCUMENTO: "No se encontró el paciente con el documento: ",
    ERROR_DNI_EXISTENTE_UPDATE: "Ocurrio un error! No se puede actualizar el documento porque ya está en uso por otro paciente. DNI: ",
    ERROR_DNI_EXISTENTE_CREATE: "Ocurrio un error! El documento que ingresaste ya está registrado para otro paciente. DNI: ",
    PACIENTE_INACTIVO_PARA_ADMISION: "No es posible realizar una admision a un paciente que no se encuentra activo!"
}

module.exports = PacienteConstants;