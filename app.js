/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const { hardCodedId, PORT, dbLink, dbOptions } = require('./configuration/config');

const app = express();

mongoose.connect(dbLink, dbOptions);

app.use(hardCodedId);
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
