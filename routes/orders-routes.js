const { Router } = require("express");

const router = Router();

const {
  getAllOrders,
  getOdrerById,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders-controllers");

const { orderValidators } = require("../middlewares/validators");

router.get("/", getAllOrders);

router.post("/new-order", orderValidators.create, createOrder);

router.get("/:orderId", getOdrerById);

router.delete("/:orderId", deleteOrder);

router.patch("/:orderId", orderValidators.update, updateOrder);

module.exports = router;
