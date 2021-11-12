const { startSession } = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const Customer = require("../models/customer");
const { validationResult } = require("../utils/validation");
const customer = require("../models/customer");

exports.getAllCustomerOrders = async (req, res, next) => {
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

  return res
    .status(200)
    .json({ success: true, orders: orders.toObject({ getters: true }) });
};

exports.getAllUserOrders = async (req, res, next) => {
  const userId = req.params.userId;

  let orders;

  try {
    orders = await Order.find({ user: userId })
      .populate("customer", "firstName lastName")
      .populate({
        path: "products",
        populate: "product",
        select: "productName id",
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again later",
    });
  }

  if (!orders || orders.length === 0)
    return res.status(202).json({ success: false, message: "no orders found" });

  return res.status(200).json({
    success: true,
    data: orders.map((order) => order.toObject({ getters: true })),
  });
};

exports.getOdrerById = async (req, res, next) => {
  const id = req.params.orderId;

  let order;
  try {
    order = await Order.findById(id)
      .populate({
        path: "products",
        populate: {
          path: "product",
          select: "productName price images",
        },
      })
      .populate("customer", "id firstName lastName");
  } catch (err) {
    res.sendStatus(500);
  }

  if (!order) return res.status(202).json("Order not found!");

  return res.status(200).json({ success: true, data: order });
};

exports.createOrder = async (req, res, next) => {
  validationResult(req, res);

  const userId = req.params.userId;
  const customerId = req.params.customerId;

  // note* i need more check if the product is ordered multi times

  let createdOrder = new Order(req.body);
  createdOrder.user = userId;
  createdOrder.customer = customerId;

  // check if products in order already exists and in stock !== 0
  // if exists reduce stock by number of product in the order.
  const products = req.body.products;
  try {
    const session = await startSession();
    session.startTransaction();
    for (const object of products) {
      let existedProduct;
      try {
        existedProduct = await Product.findById(
          object.product,
          "productName stock",
          { session }
        );
        if (!existedProduct) {
          await session.abortTransaction();
          return res.status(404).json({
            message: "one or many of ordered products not found",
            success: false,
          });
        }

        const { stock, productName } = existedProduct;

        if (object.number > stock) {
          await session.abortTransaction();
          return res.status(202).json({
            message:
              stock === 0
                ? `${productName} out of stock`
                : `only ${stock} of ${productName} in stock`,
            success: false,
          });
        }

        existedProduct.stock = stock - object.number;
        await existedProduct.save({ session });
      } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({
          message: "product not found!",
          success: false,
        });
      }
    }

    let order;
    order = await createdOrder.save({ session });

    // increase customer spent amount
    await Customer.updateOne(
      { _id: customerId },
      { $inc: { spent: createdOrder.finalPrice } },
      { session }
    );

    await session.commitTransaction();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again later",
    });
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

exports.deleteMultipleOrders = async (req, res, next) => {
  const ordersArr = req.body;

  try {
    const session = await startSession();
    session.startTransaction();

    for (const orderId of productsArr) {
      let order;
      try {
        order = await Order.findByIdAndDelete(orderId, { session });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "something went wrong, please try again later!",
        });
      }

      if (!order) {
        await session.abortTransaction();
        return res.status(202).json({
          success: false,
          message: "one of this orders not found",
        });
      }

      if (order.user.toString() !== req.role.userId.toString()) {
        await session.abortTransaction();
        return res.status(403).json({
          success: false,
          message: "you are not allowed",
        });
      }
    }

    if (session.inTransaction()) await session.commitTransaction();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again later!",
    });
  }

  return res.status(200).json({
    message: "deleted successfully",
    success: true,
  });
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
