const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  celebrate, Segments, Joi, errors,
} = require('celebrate');
const cardRoutes = require('./routes/card');
const userRoutes = require('./routes/user');
const { login, createUser, logout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error');
const urlPattern = require('./middlewares/urlPattern');
const WrongIdError = require('./middlewares/WrongIdError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());
app.use(cookieParser());
const mongoURI = 'mongodb://0.0.0.0:27017/mestodb';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(requestLogger);
app.use(
  cors({
    origin: 'http://razdva.nomoreparties.sbs',
    exposedHeaders: 'Access-Control-Allow-Origin',
    credentials: true,
  }),
);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string().pattern(urlPattern),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(auth);
app.get('/signout', logout);
app.use('/', cardRoutes);
app.use('/', userRoutes);
app.use((req, res, next) => {
  const error = new WrongIdError('Маршрут не найден');
  next(error);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
