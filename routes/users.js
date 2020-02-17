const usersRouter = require('express').Router();
const users = require('../controllers/users');

usersRouter.get('/users', users.getUsers);
usersRouter.get('/users/:userId', users.getUser);
usersRouter.post('/users', users.createUser);

module.exports = usersRouter;
