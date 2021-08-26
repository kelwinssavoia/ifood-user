const routes = require("express").Router();
const { body } = require("express-validator");

const AccountController = require("../app/controllers/AccountController");

routes.post(
  "/",
  [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 6 }),
    body("name").exists(),
    body("phone").exists(),
  ],
  AccountController.store
);

module.exports = routes;
