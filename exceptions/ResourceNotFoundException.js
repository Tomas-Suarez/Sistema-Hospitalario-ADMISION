const CustomException = require("./CustomException");

class ResourceNotFoundException extends CustomException{
  constructor(message) {
    super("ResourceNotFoundException", message, 404);
  }
}


module.exports = ResourceNotFoundException;