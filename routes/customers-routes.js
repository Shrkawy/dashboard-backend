const { Router } = require("express");
const passport = require("passport");

const router = Router({ mergeParams: true });

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  login,
} = require("../controllers/customers-controllers");

const auth = require("../middlewares/auth");

const { customerValidators } = require("../middlewares/validators");

const passportAuth = passport.authenticate("jwt", { session: false });

router.get("/", passportAuth, getAllCustomers);

router.post(
  "/",
  passportAuth,
  auth(),
  customerValidators.create,
  createCustomer
);

router.post("/login", login);

router.get(
  "/:customerId",
  passportAuth,
  auth({ itemType: "customer" }),
  getCustomerById
);

router.delete(
  "/:customerId",
  passportAuth,
  auth({ itemType: "customer" }),
  deleteCustomer
);

router.patch(
  "/:customerId",
  passportAuth,
  auth({ itemType: "customer" }),
  customerValidators.update,
  updateCustomer
);

module.exports = router;
