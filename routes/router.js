/* eslint-disable linebreak-style */
const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const sendStatus = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

router.use(usersRouter);
router.use(cardsRouter);
router.get('*', sendStatus);

module.exports = router;
