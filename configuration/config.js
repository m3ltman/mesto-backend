require('dotenv').config();

const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;
const dbLink = 'mongodb://localhost:27017/mestodb';
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const key = NODE_ENV !== 'production' ? 'dev_secret' : JWT_SECRET;

module.exports = {
  PORT,
  dbLink,
  dbOptions,
  NODE_ENV,
  JWT_SECRET,
  key,
};
