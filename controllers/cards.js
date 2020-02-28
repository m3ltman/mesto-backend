const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/config');

const { ObjectId } = mongoose.Types;
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => (cards ? res.status(200).send(cards) : res.status(200).send(cards)))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const token = req.headers.authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, JWT_SECRET);

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Not found' });
      }
      return card.owner.toString() !== payload._id ? res.status(403).send({ message: 'Forbidden' }) : Card.deleteOne(card).then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (!ObjectId.isValid(cardId)) {
        return res.status(400).send({ message: 'Bad request' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getCards, createCard, deleteCard };
