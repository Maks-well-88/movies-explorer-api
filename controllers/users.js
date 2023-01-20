const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const constants = require('../utils/constants');
const NotAuthError = require('../errors/notAuthError');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });
    const { password, ...userData } = user._doc;
    return res.status(constants.CREATED).send(userData);
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError(constants.ALREADY_EXISTS_MESSAGE));
    }
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return next(
        new BadRequestError(`${Object.values(error.errors).map((err) => err.message).join(', ')}`),
      );
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        next(new NotAuthError(constants.NO_ACCESS_MESSAGE));
        return;
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.status(constants.OK).send({ token });
      return;
    }
    if (!user) next(new NotAuthError(constants.NO_ACCESS_MESSAGE));
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      next(new BadRequestError(`${Object.values(error.errors).map((err) => err.message).join(', ')}`));
    }
    next(error);
  }
};

module.exports = {
  createUser,
  login,
};
