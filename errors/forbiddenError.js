const constants = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'forbiddenError';
    this.statusCode = constants.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
