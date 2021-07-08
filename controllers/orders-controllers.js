const Order = require("../models/order");
const { validationResult } = require("../utils/validation");

exports.getAllOrders = async (req, res, next) => {
  const customerId = req.params.customerId;

  let orders;

  try {
    orders = await Order.find({ customer: customerId });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again later",
    });
  }

  if (!orders || orders.length === 0)
    return res.status(202).json({ success: false, message: "no orders found" });

  return res.status(200).json(orders);
};

exports.getOdrerById = async (req, res, next) => {
  const id = req.params.orderId;

  let order;
  try {
    order = await Order.findById(id);
  } catch (err) {
    res.sendStatus(500);
  }

  if (!order) return res.status(202).json("Order not found!");

  return res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  validationResult(req, res);

  const userId = req.params.userId;
  const customerId = req.params.customerId;

  let createdOrder = new Order(req.body);
  createdOrder.user = userId;
  createdOrder.customer = customerId;

  let order;
  try {
    order = await createdOrder.save();
  } catch (err) {
    return res
      .status(500)
      .json("something went wrong, pleasse try again later");
  }

  return res.status(201).json(order);
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.orderId;

  let order;
  try {
    order = await Order.findByIdAndDelete(id);
  } catch (err) {
    return res
      .status(500)
      .json("something went wrong, pleasse try again later");
  }

  return res.status(200).json("deleted");
};

exports.updateOrder = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.orderId;

  const modifications = req.body;

  let order;
  try {
    order = await Order.findByIdAndUpdate(id, modifications, { new: true });
  } catch (err) {
    return res
      .status(500)
      .json("something went wrong, pleasse try again later");
  }

  if (!order) return res.status(202).json("Order not found");

  return res.status(200).json(order);
};
