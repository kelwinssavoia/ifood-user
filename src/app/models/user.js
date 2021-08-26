const mongoose = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
const moment = require("moment");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: false,
      virtual: false,
      select: false
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: Number,
      required: false
    },
    blocked: {
      type: Boolean,
      required: true
    },
    resetPasswordToken: {
      type: String,
      required: false,
      select: false
    },
    resetPasswordExpiration: {
      type: Date,
      required: false,
      select: false
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function(next) {
  const user = this;

  if (this.isNew && user.password)
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

UserSchema.methods.comparePassword = async function(password) {
  const user = await User.findOne({ _id: this._id })
    .select("password")
    .exec();

  return await bcrypt.compare(password, user.password);
};

UserSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET || "TESTE");
};

UserSchema.methods.generateResetPasswordToken = async function() {
  const user = this;

  user.resetPasswordToken = uuidv1();
  user.resetPasswordExpiration = moment(new Date())
    .add(1, "days")
    .toDate();

  await user.save();

  return user;
};

UserSchema.methods.validadeResetPasswordToken = async function() {
  const user = await User.findOne({ _id: this._id })
    .select("resetPasswordExpiration")
    .exec();

  return user.resetPasswordExpiration >= new Date();
};

UserSchema.methods.updatePassword = async function(password) {
  const user = this;
  this.password = await bcrypt.hash(password, 8);
  user.save();
};

UserSchema.methods.changeStatus = async function(blocked) {
  const user = this;

  user.blocked = blocked;

  user.save();

  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
