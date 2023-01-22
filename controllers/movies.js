const movieModel = require('../models/movies');
const constants = require('../utils/constants');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find({});
    return res.status(constants.OK).send(movies);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.create({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      owner: req.user._id,
      movieId: req.body.movieId,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    });
    const movieWithOwner = await movie.populate('owner');
    return res.status(constants.CREATED).send(movieWithOwner);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return next(new BadRequestError(`${Object.values(error.errors).map((err) => err.message).join(', ')}`));
    }
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.movieId);
    if (movie === null) {
      return next(new NotFoundError(constants.NOT_FOUND_MESSAGE));
    }
    if (movie.owner._id.toString() !== req.user._id) {
      return next(new ForbiddenError(constants.FORBIDDEN_MESSAGE));
    }
    await movieModel.findByIdAndDelete(req.params.movieId);
    return res.status(constants.OK).send(movie);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  deleteMovie,
  getMovies,
  createMovie,
};
