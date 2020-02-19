const mongoose = require('mongoose');

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
  Card.findByIdAndRemove(cardId)
    .then((card) => (card ? res.status(200).send(card) : res.status(404).send({ message: 'Not found' })))
    .catch(() => {
      if (!ObjectId.isValid(cardId)) {
        return res.status(400).send({ message: 'Bad Request' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports = { getCards, createCard, deleteCard };
