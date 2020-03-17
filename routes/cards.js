const cardsRouter = require('express').Router();
const cards = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { cardCreateCheck, idCheck } = require('../middlewares/celebrate-validation');

cardsRouter.use(auth);
cardsRouter.get('/', cards.getCards);
cardsRouter.post('/', cardCreateCheck, cards.createCard);
cardsRouter.delete('/:cardId', idCheck, cards.deleteCard);

module.exports = cardsRouter;
