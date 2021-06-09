const express = require("express");

const router = express.Router();

const {
  getAllOrders,
  getOdrerById,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders-controllers");
const {
  orderValidation,
  updateOrderValidation,
} = require("../middlewares/validators");

router.get("/", getAllOrders);

router.post("/new-order", orderValidation, createOrder);

router.get("/:orderId", getOdrerById);

router.delete("/:orderId", deleteOrder);

router.patch("/:orderId", updateOrderValidation, updateOrder);

module.exports = router;
