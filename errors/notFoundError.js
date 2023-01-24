const constants = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFoundError';
    this.statusCode = constants.NOT_FOUND;
  }
}

module.exports = NotFoundError;
