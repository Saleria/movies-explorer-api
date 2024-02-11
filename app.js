const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { login, createUser } = require('./controllers/user');
const { loginValidatoin, createUserValidation } = require('./middlewares/validator');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(cors);
app.post('/signin', loginValidatoin, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use('/users', require('./routes/user'));

app.use('/movies', require('./routes/movie'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listenin on port ${PORT}`);
});
