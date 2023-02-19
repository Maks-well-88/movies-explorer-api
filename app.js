const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const errorHandler = require('./middlewares/error');
const router = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_SRC_PUBLIC } = require('./utils/config');

const app = express();
const { NODE_ENV, DB_LOCATION, PORT = 3000 } = process.env;
const dbLocation = NODE_ENV === 'production' ? DB_LOCATION : DB_SRC_PUBLIC;

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(dbLocation, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server OK, port ${PORT}`);
});
