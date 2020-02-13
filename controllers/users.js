const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => user === null ? res.status(404).send({ message: 'Пользователь не найден' }) : res.status(200).send({user}))
    .catch(err => res.status(500).send({ message: 'Internal Server Error' }));
};

const createUser = (req, res) => {
  const { name, about, avatar} = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar
    }))
    .catch(err => res.status(400).send({ message: err.message }));
}

module.exports = { getUsers, getUser, createUser};