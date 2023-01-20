const constants = require('../utils/constants');

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'notAuthError';
    this.statusCode = constants.UNAUTHORIZED;
  }
}

module.exports = NotAuthError;
