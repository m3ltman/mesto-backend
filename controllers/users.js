/* eslint-disable object-curly-newline */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configuration/config');
const User = require('../models/user');

const { ObjectId } = mongoose.Types;


const getUsers = (req, res) => {
  User.find({})
    .then((users) => (users ? res.status(200).send(users) : res.status(200).send(users)))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => (user ? res.status(200).send(user) : res.status(404).send({ message: 'Not Found' })))
    .catch(() => {
      if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ message: 'Bad Request' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch((err) => {
      if (err.message !== 'Неправильные почта или пароль') {
        return res.status(500).send({ message: err.message });
      }
      return res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
};
