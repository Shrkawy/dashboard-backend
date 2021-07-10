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

const auth = require("../middlewares/auth");

const passportAuth = passport.authenticate("jwt", { session: false });

router.get("/", passportAuth, auth(), getAllOrders);

router.post("/", passportAuth, auth(), orderValidators.create, createOrder);

router.get(
  "/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  getOdrerById
);

router.delete(
  "/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  deleteOrder
);

router.patch(
  "/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  orderValidators.update,
  updateOrder
);

module.exports = router;
