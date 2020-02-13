const cardsRouter = require('express').Router();
const cards = require('../controllers/cards');

cardsRouter.get('/cards', cards.getCards);
cardsRouter.post('/cards', cards.createCard);
cardsRouter.delete('/cards/:cardId', cards.deleteCard);

module.exports = cardsRouter;