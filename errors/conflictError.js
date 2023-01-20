const constants = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.CONFLICT;
  }
}

module.exports = ConflictError;
