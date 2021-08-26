const { validationResult } = require("express-validator");
const User = require("../models/user");
const profileEnum = require("../statics/profileEnum");

class SessionContoller {
  async signin(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    if (user.blocked) {
      return res.status(401).send({ message: "Blocked user" });
    }

    if (await user.comparePassword(password)) {
      return res.json({
        user,
        token: user.generateToken(),
      });
    }

    return res.status(401).send({ message: "Invalid password" });
  }

  async userInfos(req, res) {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    if (user.blocked) {
      return res.status(401).send({ message: "Blocked user" });
    }

    return res.json({
      user,
    });

    return res.status(401).send({ message: "Invalid password" });
  }
}

module.exports = new SessionContoller();
