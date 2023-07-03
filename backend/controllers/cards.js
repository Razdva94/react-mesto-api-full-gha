const Card = require('../models/card');
const WrongData = require('../middlewares/WrongDataError');
const WrongId = require('../middlewares/WrongIdError');
const AccessError = require('../middlewares/AccessError');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = new Card({ name, link, owner: ownerId });
    const validationError = card.validateSync();
    if (validationError) {
      next(new WrongData('Переданы некорректные данные карточки.'));
      return;
    }
    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    if (error.statusCode === 400) {
      next(new WrongData('Переданы некорректные данные карточки.'));
    }
    next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      next(new WrongId('Карточка с указанным _id не найдена.'));
      return;
    }
    if (req.user._id !== card.owner.toString()) {
      next(new AccessError('Ошибка доступа'));
      return;
    }
    await Card.deleteOne({ _id: cardId });
    res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new WrongData('Переданы некорректные данные карточки.'));
    } else {
      next(error);
    }
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      next(new WrongId('Карточка с указанным _id не найдена.'));
      return;
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new WrongData('Переданы некорректные данные карточки.'));
    } else {
      next(error);
    }
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      next(new WrongId('Карточка с указанным _id не найдена.'));
      return;
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new WrongData('Переданы некорректные данные карточки.'));
    } else {
      next(error);
    }
  }
};
