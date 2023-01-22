const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
require('dotenv').config();
const NotAuthError = require('../errors/notAuthError');
const { JWT_PUBLIC } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;
const key = NODE_ENV === 'production' ? JWT_SECRET : JWT_PUBLIC;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError(constants.AUTH_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new NotAuthError(constants.AUTH_MESSAGE));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
