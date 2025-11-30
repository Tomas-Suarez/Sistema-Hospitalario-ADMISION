const CustomException = require("./CustomException");

class InvalidStateException extends CustomException{
  constructor(message) {
    super("InvalidStateException", message, 409);
  }
}


module.exports = InvalidStateException;