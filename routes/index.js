const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const constants = require('../utils/constants');
const { signinValidation, signupValidation } = require('../utils/validation');
const NotFoundError = require('../errors/notFoundError');

router.post('/api/signin', signinValidation, login);
router.post('/api/signup', signupValidation, createUser);

router.use('/api/users', auth, userRouter);
router.use('/api/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError(constants.NOT_FOUND_PAGE)));

module.exports = router;
