const jwt = require('jsonwebtoken');
const { key } = require('../configuration/config');
const UnathorizedErr = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnathorizedErr('Unathorized');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, key);
  } catch (err) {
    next(new UnathorizedErr(err.message));
  }
  req.user = payload;

  next();
};
