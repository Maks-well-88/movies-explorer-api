const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server OK, port ${PORT}`);
});
