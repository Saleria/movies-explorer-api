const router = require('express').Router();
const { createMovie, deleteMovie, getMovie } = require('../controllers/movie');
const { createMovieValidation, movieIdValidation } = require('../middlewares/validator');

router.get('/', getMovie);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
