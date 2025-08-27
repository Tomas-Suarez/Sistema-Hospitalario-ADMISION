const CustomException = require("./CustomException");

class InactivePatientException extends CustomException{
  constructor(message) {
    super("InactivePatientException", message, 409);
  }
}


module.exports = InactivePatientException;