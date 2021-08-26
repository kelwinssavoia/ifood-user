const mongoose = require("mongoose");

mongoose.connect(
  process.env.CONNECTION_STRING ||
    "mongodb://mongo:27017/ifood-login",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
