const mongoose = require("mongoose");
const Customer = require("../models/customer");
const HttpError = require("../middlewares/http-error");
const { validationResult } = require("express-validator");

exports.getAllCustomers = async (req, res, next) => {
  let customers;

  try {
    customers = await Customer.find();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong, please try again later",
      500
    );
    return next(error);
  }

  if (!customers || customers.length === 0)
    return res.status(202).json("no customers found");

  return res.status(200).json(customers);
};

exports.getCustomerById = async (req, res, next) => {
  const customerId = req.params.customerId;

  if (!mongoose.isValidObjectId(customerId))
    return res.status(422).json("could not find this customer");

  let customer;

  try {
    customer = await Customer.findById(customerId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "somthing went wrong, please try again later",
      500
    );
    return next(error);
  }

  if (!customer) return res.status(202).json("could not find this customer");

  return res.status(200).json(customer);
};

exports.createCustomer = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.mapped());

  const {
    registerDate,
    firstName,
    lastName,
    birthDate,
    country,
    state,
    city,
    address1,
    address2,
    zipCode,
    email,
    phone,
    cridetCard,
    activity,
  } = req.body;

  const createdCustomer = new Customer({
    registerDate,
    firstName,
    lastName,
    birthDate,
    country,
    country,
    state,
    city,
    address1,
    address2,
    zipCode,
    email,
    phone,
    cridetCard,
    activity,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createdCustomer.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong, please try again later",
      500
    );
    return next(error);
  }

  return res.status(201).json(createdCustomer);
};

exports.deleteCustomer = async (req, res, next) => {
  const id = req.params.customerId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("could not find this customer");

  let customer;

  try {
    customer = await Customer.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "somthing went wrong, please try again later",
      500
    );
    return next(error);
  }

  if (!customer) return res.status(202).json("could not find this customer");

  return res.status(200).json("deleted");
};

exports.updateCustomer = async (req, res, next) => {
  const id = req.params.customerId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("no customer found");

  const errors = validationResult(req);

  if (!errors.isEmpty() || Object.keys(req.body).length === 0) {
    return res
      .status(422)
      .json(
        errors.isEmpty()
          ? "you can not update this customer with no changes"
          : errors.mapped()
      );
  }

  let customer;

  try {
    customer = await Customer.findById(id);
  } catch (err) {
    return next(new HttpError("somthing went wrong, please try again later!"));
  }

  if (!customer) return res.status(202).json("no customer to be updated");

  const modCustomer = req.body;
  modCustomer.lastModified = new Date().toISOString();

  for (const [key, value] of Object.entries(modCustomer)) {
    customer[key] = value;
  }

  try {
    customer = await customer.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).json(customer);
};
