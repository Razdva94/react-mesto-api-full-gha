const jwt = require('jsonwebtoken');
const NotFound = require('./NotFoundError');

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotFound('Необходима авторизаци'));
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
    next(new NotFound('Необходима авторизаця'));
    return;
  }
  req.user = payload;
  next();
};
