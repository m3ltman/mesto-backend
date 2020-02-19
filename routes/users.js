const usersRouter = require('express').Router();
const users = require('../controllers/users');

usersRouter.get('/', users.getUsers);
usersRouter.post('/', users.createUser);
usersRouter.get('/:userId', users.getUser);


module.exports = usersRouter;
