const routes = require("express").Router();

routes.use("/account", require("./account"));
routes.use("/session", require("./session"));

module.exports = routes;
