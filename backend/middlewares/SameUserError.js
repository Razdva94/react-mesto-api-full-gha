class SameUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SameUserError';
    this.statusCode = 409;
  }
}

module.exports = SameUserError;
