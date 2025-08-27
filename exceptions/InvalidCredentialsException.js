const CustomException = require("./CustomException");

class InvalidCredentialsException extends CustomException{
  constructor(message) {
    super("InvalidCredentialsException", message, 401);
  }
}


module.exports = InvalidCredentialsException;