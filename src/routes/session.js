const routes = require("express").Router();
const { body } = require("express-validator");

const SessionController = require("../app/controllers/SessionController");

routes.post(
  "/signin",
  [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 6 }),
  ],
  SessionController.signin
);
routes.post("/me", [], SessionController.userInfos);
module.exports = routes;
