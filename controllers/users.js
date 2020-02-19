const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Validation Failed' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports = { getUsers, getUser, createUser };
