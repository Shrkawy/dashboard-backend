const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { startSession } = require("mongoose");

const HttpError = require("../middlewares/http-error");
const User = require("../models/user");
const Role = require("../models/role");
const { validationResult } = require("../utils/validation");

exports.signup = async (req, res, next) => {
  validationResult(req, res);

  const { username, password, email } = req.body;

  let existedEmail;
  let existedUserName;

  try {
    existedEmail = await User.findOne({ email });
    existedUserName = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }

  if (existedEmail || existedUserName)
    return res
      .status(409)
      .json(existedEmail ? "email already exists" : "username already exists");

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }

  const createdUser = new User(req.body);
  createdUser.password = hashedPassword;

  const userRole = new Role({
    userId: createdUser._id,
    userType: "user",
    globalPerms: true,
  });

  try {
    const session = await startSession();
    session.startTransaction();
    await createdUser.save({ session });
    await userRole.save({ session });
    session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        role: userRole.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1 day",
      }
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }
  return res
    .status(201)
    .json({ id: createdUser.id, email: createdUser.email, token });
};
exports.login = async (req, res, next) => {
  validationResult(req, res);

  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) return res.status(401).json("username or password wrong!");

  let isValidPassword;

  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) res.status(401).json("username or password wrong!");

  let token, role;

  try {
    role = await Role.findOne({ userId: user.id });
  } catch (err) {
    return res.status(500);
  }

  if (!role) return res.status(202).json("not found");

  try {
    token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: role.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1 day",
      }
    );
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).json({ id: user.id, email: user.email, token });
};
