const { startSession } = require("mongoose");
const jwt = require("jsonwebtoken");

const Customer = require("../models/customer");
const Role = require("../models/role");
const { find, findById, deleteOne, updateOne } = require("../utils/database");
const { validationResult } = require("../utils/validation");

exports.getAllCustomers = async (req, res, next) => {
  const customers = await find(Customer, next);

  if (!customers || customers.length === 0)
    return res.status(202).json(`not found`);

  return res.status(200).json(customers);
};

exports.getCustomerById = async (req, res, next) => {
  const id = req.params.id;
  const customer = await findById(id, Customer, res, next);

  if (!customer) return res.status(202).json("not found");

  return res.status(200).json(customer);
};

exports.createCustomer = async (req, res, next) => {
  validationResult(req, res);

  const createdCustomer = new Customer(req.body);
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

  let token;

  try {
    token = jwt.sign(
      {
        userId: createdCustomer.id,
        name: `${createdCustomer.firstName} ${createdCustomer.lastName}`,
        email: createdCustomer.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1 week",
      }
    );
  } catch (err) {
    return res.statusCode(500);
  }

  return res.status(201).json({
    customerName: `${createdCustomer.firstName} ${createdCustomer.lastName}`,
    email: createdCustomer.email,
    token,
  });
};

exports.deleteCustomer = async (req, res, next) => {
  const id = req.params.id;

  const customer = await findById(id, Customer, next);

  if (!customer) return res.status(202).json("not found");

  await deleteOne(id, Customer, next);

  return res.status(200).json("deleted");
};

exports.updateCustomer = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.id;
  const modifications = req.body;

  let customer = await findById(id, Customer, next);

  if (!customer) return res.status(202).json("not found");

  customer = await updateOne(customer, modifications, next);

  return res.status(200).json(customer);
};
