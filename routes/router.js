/* eslint-disable linebreak-style */
const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

const sendStatus = (req, res) => {
    res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
}

router.get('/users', users.sendAllUsers);
router.get('/users/:id', users.sendUser);
router.get('/cards', cards);
router.get('*', sendStatus);

module.exports = router;
