const Movie = require('../models/movie');
const { OK, CREATED_OK } = require('../responses/responses');
const BadRequest = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATED_OK).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (movie === null) {
        next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалять фильмы других пользователей'));
      } return movie.deleteOne()
        .then(() => {
          res.status(OK).send({ message: 'Фильм успешно удалён' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
