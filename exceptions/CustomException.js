class CustomException extends Error {
  constructor(name, message, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

module.exports = CustomException;