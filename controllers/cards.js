const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../configuration/config');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequest');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

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
  const payload = jwt.verify(req.cookies.jwt, NODE_ENV !== 'production' ? 'dev_secret' : JWT_SECRET);

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Not Found');
      } else if (card.owner.toString() !== payload._id) {
        throw new ForbiddenErr('Forbidden');
      } else {
        Card.deleteOne(card).then(() => res.status(200).send(card));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Bad request'));
      }
      return next(err);
    });
};

module.exports = { getCards, createCard, deleteCard };
