const Order = require("../models/order");
const Product = require("../models/product");
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

  return res.status(200).json({ success: true, orders });
};

exports.getOdrerById = async (req, res, next) => {
  const id = req.params.orderId;

  let order;
  try {
    order = await Order.findById(id).populate({
      path: "products",
      populate: "product",
    });
  } catch (err) {
    res.sendStatus(500);
  }

  if (!order) return res.status(202).json("Order not found!");

  return res.status(200).json({ success: true, order });
};

exports.createOrder = async (req, res, next) => {
  validationResult(req, res);

  const userId = req.params.userId;
  const customerId = req.params.customerId;

  // check if products in order already exists and in stock !== 0
  // note* i need more check if the product is ordered multi times
  const products = req.body.products;

  for (const object of products) {
    let existedProduct;
    try {
      existedProduct = await Product.findById(
        object.product,
        "productName stock"
      );
    } catch (err) {
      return res.status(500).json({
        message: "something went wrong, please try again later!",
        success: false,
      });
    }

    const { stock, productName } = existedProduct;

    if (!existedProduct) {
      return res.status(404).json({
        message: "one or many of ordered products not found",
        success: false,
      });
    }

    if (object.number > stock) {
      return res.status(202).json({
        message:
          stock === 0
            ? `${productName} out of stock`
            : `only ${stock} of ${productName} in stock`,
        success: false,
      });
    }
  }

  let createdOrder = new Order(req.body);
  createdOrder.user = userId;
  createdOrder.customer = customerId;

  let order;
  try {
    order = await createdOrder.save();
  } catch (err) {
    return res.status(500).json(err);
  }

  return res
    .status(201)
    .json({ success: true, message: "created successfully", order });
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.orderId;

  try {
    await Order.findByIdAndDelete(id);
  } catch (err) {
    return res
      .status(500)
      .json("something went wrong, pleasse try again later");
  }

  return res
    .status(200)
    .json({ success: true, message: "deleted successfully" });
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

  return res
    .status(201)
    .json({ success: true, message: "updated successfully", order });
};
