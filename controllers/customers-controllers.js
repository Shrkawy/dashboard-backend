const { startSession } = require("mongoose");
const jwt = require("jsonwebtoken");

const Customer = require("../models/customer");
const Role = require("../models/role");
const { validationResult } = require("../utils/validation");
const { issueJWT } = require("../utils/jwt");

exports.getAllCustomers = async (req, res, next) => {
  const id = req.params.userId;

  let customers;
  try {
    customers = await Customer.find({ user: id });
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!customers || customers.length === 0)
    return res
      .status(202)
      .json({ message: "no customers found!", success: false });

  return res.status(200).json({ customers, success: true });
};

exports.getCustomerById = async (req, res, next) => {
  const id = req.params.customerId;

  let customer;

  try {
    customer = await Customer.findById(id);
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!customer) return res.status(202).json("not found");

  return res.status(200).json(customer);
};

exports.createCustomer = async (req, res, next) => {
  validationResult(req, res);

  let createdCustomer = new Customer(req.body);
  createdCustomer.user = req.params.userId;

  const customerRole = new Role({
    userId: createdCustomer._id,
    userType: "customer",
    privatePerms: true,
  });

  try {
    const session = await startSession();
    session.startTransaction();
    await createdCustomer.save({ session });
    await customerRole.save({ session });
    session.commitTransaction();
  } catch (err) {
    return res.statusCode(500);
  }

  const token = issueJWT(createdCustomer, customerRole);

  return res.status(201).json({
    customerName: `${createdCustomer.firstName} ${createdCustomer.lastName}`,
    email: createdCustomer.email,
    token,
  });
};

exports.deleteCustomer = async (req, res, next) => {
  const id = req.params.customerId;

  let customer;
  try {
    customer = await Customer.findByIdAndDelete(id);
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!customer) return res.status(202).json("not found");

  return res.status(200).json("deleted");
};

exports.updateCustomer = async (req, res, next) => {
  // must check if at least one value exists to validate
  validationResult(req, res);

  const id = req.params.customerId;
  const modifications = req.body;

  let customer;

  try {
    customer = await Customer.findByIdAndUpdate(id, modifications, {
      new: true,
    });
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!customer) return res.status(202).json("not found");

  return res.status(201).json(customer);
};
