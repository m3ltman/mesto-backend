const { celebrate, Joi } = require('celebrate');

const userCreateCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
});

const userLoginCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
});

const idCheck = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
    userId: Joi.string().alphanum().length(24),
  }),
});

const cardCreateCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
});


module.exports = {
  userCreateCheck,
  userLoginCheck,
  idCheck,
  cardCreateCheck,
};
