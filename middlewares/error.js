const constants = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || constants.SERVER_ERROR;
  const message = statusCode === 500 ? constants.SERVER_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
