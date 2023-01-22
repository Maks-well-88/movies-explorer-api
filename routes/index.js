const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const constants = require('../utils/constants');
const { signinValidation, signupValidation } = require('../utils/validation');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError(constants.NOT_FOUND_PAGE)));

module.exports = router;
