const jwt = require('jsonwebtoken');
const { key } = require('../configuration/config');
const UnathorizedError = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnathorizedError('Unathorized');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, key);
  } catch (err) {
    next(new UnathorizedError(err.message));
  }
  req.user = payload;

  next();
};
