const { validationResult } = require("express-validator");
const User = require("../models/user");
const profileEnum = require("../statics/profileEnum");

class AccountContoller {
  async store(req, res) {
    const { name, email, password, phone } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (await User.findOne({ email: email })) {
      return res.status(400).send({ message: "Email already in use" });
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        phone,
        blocked: false,
        profile: profileEnum.USUARIO,
      });

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Error on create user!" });
    }
  }
}

module.exports = new AccountContoller();
