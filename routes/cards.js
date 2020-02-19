const cardsRouter = require('express').Router();
const cards = require('../controllers/cards');

cardsRouter.get('/', cards.getCards);
cardsRouter.post('/', cards.createCard);
cardsRouter.delete('/:cardId', cards.deleteCard);

module.exports = cardsRouter;
