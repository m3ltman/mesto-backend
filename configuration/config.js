const hardCodedId = ((req, res, next) => {
  req.user = {
    _id: '5e44edcb7718a10ef8ae8858',
  };

  next();
});
const { PORT = 3000 } = process.env;
const dbLink = 'mongodb://localhost:27017/mestodb';
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
};

module.exports = {
  hardCodedId,
  PORT,
  dbLink,
  dbOptions,
};
