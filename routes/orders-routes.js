const { Router } = require("express");

const router = Router();

const {
  getAllOrders,
  getOdrerById,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders-controllers");

const { orderValidators, isValid } = require("../middlewares/validators");

const auth = require("../middlewares/auth");
const order = require("../models/order");

router.get("/",auth(['user']), getAllOrders);

router.post(
  "/new-order",
  auth(["user"]),
  orderValidators.create,
  createOrder
);

router.get("/:id", auth(["item"], order), isValid.id, getOdrerById);

router.delete("/:id", auth(["item"], order), isValid.id, deleteOrder);

router.patch(
  "/:id",
  auth(["item"], order),
  isValid.id,
  orderValidators.update,
  updateOrder
);

module.exports = router;
