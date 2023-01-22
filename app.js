const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { DB_LOCATION, PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_LOCATION, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server OK, port ${PORT}`);
});
