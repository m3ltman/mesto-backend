const { celebrate, Joi } = require('celebrate');

const userValidaton = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports = { userValidaton };
