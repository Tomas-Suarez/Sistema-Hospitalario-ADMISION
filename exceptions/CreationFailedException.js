const CustomException = require("./CustomException");

class CreationFailedException extends CustomException{
  constructor(message) {
    super("CreationFailedException", message, 400);
  }
}


module.exports = CreationFailedException;