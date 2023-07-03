/* eslint-disable no-unused-vars */
exports.errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
