const routes = require("express").Router();
const { body } = require("express-validator");
const authMiddleware = require("../app/middleware/auth");

const SessionController = require("../app/controllers/SessionController");

routes.post(
  "/signin",
  [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 6 }),
  ],
  SessionController.signin
);
routes.post("/me", [authMiddleware], SessionController.userInfos);
module.exports = routes;
