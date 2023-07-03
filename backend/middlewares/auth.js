const jwt = require('jsonwebtoken');
const NotFound = require('./NotFoundError');

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotFound('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new NotFound('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
