const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const urlPattern = require('../middlewares/urlPattern');

const router = express.Router();
const user = require('../controllers/users');

router.get('/users', user.getUsers);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  user.updateUser,
);

router.get('/users/me', user.getUser);

router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().pattern(
        urlPattern,
      ),
    }),
  }),
  user.updateAvatar,
);

router.get(
  '/users/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().hex().length(24).required(),
    },
  }),
  user.getUserById,
);

module.exports = router;
