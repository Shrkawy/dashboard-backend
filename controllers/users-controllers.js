const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../middlewares/http-error");
const User = require("../models/user");
const { validationResult } = require("../utils/validation");

exports.signup = async (req, res, next) => {
  validationResult(req, res);

  const {
    username,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
    email,
    phone,
    store,
    currency,
    country,
    city,
    address,
    zipCode,
  } = req.body;

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
  }

  const createdUser = new User({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    gender,
    birthDate,
    email,
    phone,
    store,
    currency,
    country,
    city,
    address,
    zipCode,
  });

  try {
    await createdUser.save();
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
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1hr",
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

  let token;

  try {
    token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1hr",
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
