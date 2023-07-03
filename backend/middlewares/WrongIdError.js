class WrongIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongId';
    this.statusCode = 404;
  }
}

module.exports = WrongIdError;
