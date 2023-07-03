class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongData';
    this.statusCode = 400;
  }
}

module.exports = WrongDataError;
