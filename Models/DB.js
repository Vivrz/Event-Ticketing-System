const mongoose = require('mongoose');
require('dotenv').config();

function connectionWithDB() {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectionWithDB;
