const constants = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
