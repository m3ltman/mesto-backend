const jwt = require('jsonwebtoken');
const { key } = require('../configuration/config');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const ForbiddenError = require('../errors/Forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => (cards ? res.status(200).send(cards) : res.status(200).send(cards)))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const payload = jwt.verify(req.cookies.jwt, key);

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Not Found');
    })
    .then((card) => {
      if (card.owner.toString() !== payload._id) {
        throw new ForbiddenError('Forbidden');
      }
      return Card.deleteOne(card).then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Bad request'));
      }
      return next(err);
    });
};

module.exports = { getCards, createCard, deleteCard };
