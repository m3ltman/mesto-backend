const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../configuration/config');
const UnathorizedErr = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnathorizedErr('Unathorized');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV !== 'production' ? 'dev_secret' : JWT_SECRET);
  } catch (err) {
    next(new UnathorizedErr(err.message));
  }
  req.user = payload;

  next();
};
