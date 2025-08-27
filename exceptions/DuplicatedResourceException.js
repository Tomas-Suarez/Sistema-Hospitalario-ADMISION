const CustomException = require("./CustomException");

class DuplicatedResourceException extends CustomException{
  constructor(message) {
    super("DuplicatedResourceException", message, 409);
  }
}


module.exports = DuplicatedResourceException;