/* eslint-disable object-curly-newline */
const usersRouter = require('express').Router();
const { getUsers, createUser, getUser, login } = require('../controllers/users');
const { userCreateCheck, userLoginCheck, idCheck } = require('../middlewares/celebrate-validation');
const auth = require('../middlewares/auth');

usersRouter.post('/signup', userCreateCheck, createUser);
usersRouter.post('/signin', userLoginCheck, login);

usersRouter.use(auth);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', idCheck, getUser);

module.exports = usersRouter;
