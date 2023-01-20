const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
require('dotenv').config();
const NotAuthError = require('../errors/notAuthError');

// перед продакшн забирать секретный код из окружения
const JWT_SECRET = 'secret-key';

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError(constants.AUTH_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new NotAuthError(constants.AUTH_MESSAGE));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
