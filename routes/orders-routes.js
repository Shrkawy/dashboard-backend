const { Router } = require("express");
const passport = require("passport");

const router = Router({ mergeParams: true });

const {
  getAllOrders,
  getOdrerById,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders-controllers");

const { orderValidators } = require("../middlewares/validators");

const passportAuth = passport.authenticate("jwt", { session: false });

router.get("/", passportAuth, getAllOrders);

router.post("/", passportAuth, orderValidators.create, createOrder);

router.get("/:orderId", passportAuth, getOdrerById);

router.delete("/:orderId", passportAuth, deleteOrder);

router.patch("/:orderId", passportAuth, orderValidators.update, updateOrder);

module.exports = router;
