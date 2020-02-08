/* eslint-disable linebreak-style */
const cards = require('../data/cards');

const sendCard = (req, res) => {
  res.send(cards);
}

module.exports = sendCard;
