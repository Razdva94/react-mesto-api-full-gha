const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const urlPattern = require('../middlewares/urlPattern');

const router = express.Router();
const user = require('../controllers/users');

router.get('/users', user.getUsers);

router.get('/users/me', user.getUser);

router.get(
  '/users/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().hex().length(24).required(),
    },
  }),
  user.getUserById,
);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  user.updateUser,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().pattern(urlPattern).required(),
    }),
  }),
  user.updateAvatar,
);

module.exports = router;
