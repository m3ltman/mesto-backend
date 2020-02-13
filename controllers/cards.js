const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(err => res.status(500).send({ message: 'Карточки не найдены' }))
}

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send({
      name: card.name,
      link: card.link,
    }))
    .catch(err => res.status(400).send({ message: err.message }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send({card}))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports = { getCards, createCard, deleteCard };