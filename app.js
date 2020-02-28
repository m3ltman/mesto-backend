/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const { PORT, dbLink, dbOptions } = require('./configuration/config');

const app = express();

mongoose.connect(dbLink, dbOptions);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
