const Customer = require("../models/customer");
const {
  find,
  findById,
  deleteOne,
  update,
  createOne,
} = require("../utils/database");
const { validationResult } = require("../utils/validation");

exports.getAllCustomers = async (req, res, next) => {
  const customers = await find(Customer, res, next);

  return res.status(200).json(customers);
};

exports.getCustomerById = async (req, res, next) => {
  const id = req.params.customerId;

  const customer = await findById(id, Customer, res, next);

  return res.status(200).json(customer);
};

exports.createCustomer = async (req, res, next) => {
  validationResult(req, res);

  let createdCustomer = await createOne(req, next, Customer);

  return res.status(201).json(createdCustomer);
};

exports.deleteCustomer = async (req, res, next) => {
  const id = req.params.customerId;

  await findById(id, Customer, next);
  await deleteOne(id, Customer, next);

  return res.status(200).json("deleted");
};

exports.updateCustomer = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.customerId;
  const modifications = req.body;

  let customer = await findById(id, Customer, next);

  customer = await update(customer, modifications, next);

  return res.status(200).json(customer);
};
