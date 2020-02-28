/* eslint-disable object-curly-newline */
const usersRouter = require('express').Router();
const { getUsers, createUser, getUser, login } = require('../controllers/users');
const { userValidaton } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

usersRouter.post('/signup', userValidaton, createUser);
usersRouter.post('/signin', login);

usersRouter.use(auth);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);

module.exports = usersRouter;
