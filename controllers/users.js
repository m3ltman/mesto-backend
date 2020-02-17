const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => (users ? res.status(200).send(users) : res.status(404).send({ message: 'Not Found' })))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => (user ? res.status(200).send(user) : res.status(404).send({ message: 'Not Found' })))
    .catch(() => res.status(400).send({ message: 'Bad request' }));
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
        res.status(400).send({ message: 'Validation Failed' });
      }
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports = { getUsers, getUser, createUser };
