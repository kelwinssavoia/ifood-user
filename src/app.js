require("dotenv").config({
  path: ".env"
});
var cors = require("cors");

const express = require("express");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new AppController().express;
