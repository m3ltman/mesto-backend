const users = require('../controllers/users');
const usersRouter = require('express').Router();

usersRouter.get('/users', users.getUsers);
usersRouter.get('/users/:userId', users.getUser);
usersRouter.post('/users', users.createUser);

module.exports = usersRouter;