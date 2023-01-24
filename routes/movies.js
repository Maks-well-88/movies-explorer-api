const router = require('express').Router();
const { deleteMovie, getMovies, createMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
