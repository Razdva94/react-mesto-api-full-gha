const jwt = require('jsonwebtoken');
const NotFound = require('./UnauthorizedError');
require('dotenv').config();

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotFound('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new NotFound('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
