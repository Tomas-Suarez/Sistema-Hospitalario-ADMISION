const CustomException = require("./CustomException");

class ForbiddenException extends CustomException{
  constructor(message) {
    super("ForbiddenException", message, 403);
  }
}


module.exports = ForbiddenException;