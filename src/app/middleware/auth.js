const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader)
      return res.status(401).json({ message: "Token not provided" });

    [, token] = authHeader.split(" ");
    const obj = jwt.verify(token, process.env.APP_SECRET);
    req.userId = obj.id;
    const user = await User.findById(obj.id);

    if (user.blocked) return res.status(401).json({ message: "Blocked User" });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
