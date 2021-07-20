const { Router } = require("express");
const passport = require("passport");

const router = Router({ mergeParams: true });

const {
  getAllCustomerOrders,
  getAllUserOrders,
  getOdrerById,
  createOrder,
  deleteOrder,
  updateOrder,
  deleteMultipleOrders,
} = require("../controllers/orders-controllers");

const { orderValidators } = require("../middlewares/validators");

const auth = require("../middlewares/auth");

const passportAuth = passport.authenticate("jwt", { session: false });

router.get("/", passportAuth, auth(), getAllUserOrders);
router.get("/:orderId", passportAuth, auth(), getOdrerById);

router.post("/", passportAuth, auth(), orderValidators.create, createOrder);

router.delete("/", passportAuth, auth(), deleteMultipleOrders);

router.get(
  "/:customerId/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  getOdrerById
);

router.delete(
  "/:customerId/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  deleteOrder
);

router.patch(
  "/:customerId/:orderId",
  passportAuth,
  auth({ itemType: "order" }),
  orderValidators.update,
  updateOrder
);

module.exports = router;
