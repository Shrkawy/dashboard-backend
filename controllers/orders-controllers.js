const mongoose = require("mongoose");
const Order = require("../models/order");
const HttpError = require("../middlewares/http-error");
const { validationResult } = require("express-validator");

exports.getAllOrders = async (req, res, next) => {
  let orders;

  try {
    orders = await Order.find();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!orders) return res.status(202).json([]);

  return res.status(200).json(orders);
};

exports.getOdrerById = async (req, res, next) => {
  const orderid = req.params.orderId;

  if (!mongoose.isValidObjectId(orderId))
    return res.status(422).json("no product found");

  let order;

  try {
    order = await Order.findById(orderid);
  } catch (err) {
    const error = new HttpError("Order not found!", 500);
    return next(error);
  }

  if (!order) return res.status(202).json("Order not found!");

  return res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors);

  const {
    customer,
    createdDate,
    products,
    originalPrice,
    discount,
    finalPrice,
    status,
  } = req.body;

  const createdOrder = new Order({
    customer,
    createdDate,
    products,
    originalPrice,
    discount,
    finalPrice,
    status,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOrder.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "failed to create order, please try again later",
      500
    );
    return next(error);
  }

  return res.status(201).json(createdOrder);
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.orderId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("no product found");

  let order;

  try {
    order = await Order.findByIdAndDelete(id);
  } catch (err) {
    const error = new HttpError(
      "something went wrong please try again later!",
      500
    );
    return next(error);
  }

  if (!order) return res.status(202).json("Order not found!");

  return res.status(200).json("deleted");
};

exports.updateOrder = async (req, res, next) => {
  const id = req.params.orderId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("no product found");

  const errors = validationResult(req);

  if (!errors.isEmpty() || Object.keys(req.body).length === 0) {
    return res
      .status(422)
      .json(
        errors.isEmpty()
          ? "you can not update this order with no changes"
          : errors.mapped()
      );
  }

  let order;

  try {
    order = await Order.findById(id);
  } catch (err) {
    const error = new HttpError(
      "something went wrong please try again later!",
      500
    );
    return next(error);
  }

  if (!order) return res.status(202).json("no product to be updated");

  const modOrder = req.body;
  modOrder.lastModified = new Date().toISOString();

  for (const [key, value] of Object.entries(modOrder)) {
    order[key] = value;
  }

  try {
    order = await order.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).json(order);
};
