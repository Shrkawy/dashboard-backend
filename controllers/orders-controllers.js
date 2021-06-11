const Order = require("../models/order");
const {
  find,
  findById,
  deleteOne,
  updateOne,
  createOne,
} = require("../utils/database");
const { validationResult } = require("../utils/validation");

exports.getAllOrders = async (req, res, next) => {
  const orders = await find(Order, res, next);

  return res.status(200).json(orders);
};

exports.getOdrerById = async (req, res, next) => {
  const id = req.params.orderId;

  const order = await findById(id, Order, res, next);

  return res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  validationResult(req, res);

  let createdOrder = await createOne(req, next, Order);

  return res.status(201).json(createdOrder);
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.orderId;

  await findById(id, Order, res, next);
  await deleteOne(id, Order, next);

  return res.status(200).json("deleted");
};

exports.updateOrder = async (req, res, next) => {
  validationResult(req, res);
  const id = req.params.orderId;

  const modifications = req.body;

  let order = await findById(id, Order, next);

  order = await updateOne(order, modifications, next);

  return res.status(200).json(order);
};
