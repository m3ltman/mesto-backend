/* eslint-disable linebreak-style */
const users = require('../data/users.json');

const sendAllUsers = (req, res) => {
  res.send(users);
}

const sendUser = (req, res) => {
  const user = users.find((item) => {
    let result = item._id === req.params.id;
    return result;
  });
  
  if(!user) {
    res.status(404).send({ "message": "Нет пользователя с таким id" });
    return;
  }
  
  res.send(user);
}

module.exports = {
  sendAllUsers,
  sendUser,
}