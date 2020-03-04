/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../configuration/config');
const UnathorizedErr = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnathorizedErr('Unathorized');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? 'dev_secret' : JWT_SECRET);
  } catch (err) {
    next(new UnathorizedErr(err.message));
  }
  req.user = payload;

  next();
};
