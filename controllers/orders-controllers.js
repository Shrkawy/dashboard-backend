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
  const orders = await find(Order, next);

  if (!orders || orders.length === 0) return res.status(202).json(`not found`);

  return res.status(200).json(orders);
};

exports.getOdrerById = async (req, res, next) => {
  const id = req.params.id;

  const order = await findById(id, Order, next);

  if (!order) return res.status(202).json("not found!");

  return res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  validationResult(req, res);

  let createdOrder = new Order(req.body);

  req.customer
    ? (createdOrder.customer = req.customer)
    : (createdOrder.user = req.user);

  let order;
  try {
    order = await createdOrder.save();
  } catch (err) {
    res.status(500).json("something went wrong, pleasse try again later");
  }
  
  return res.status(201).json(order);
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.id;

  const order = await findById(id, Order, next);

  if (!order) return res.status(202).json("not found");

  await deleteOne(id, Order, next);

  return res.status(200).json("deleted");
};

exports.updateOrder = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.id;

  const modifications = req.body;

  let order = await findById(id, Order, next);

  if (!order) return res.status(202).json("not found");

  order = await updateOne(order, modifications, next);

  return res.status(200).json(order);
};
