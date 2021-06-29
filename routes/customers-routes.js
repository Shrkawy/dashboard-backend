const { Router } = require("express");

const router = Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers-controllers");
const auth = require("../middlewares/auth");

const { customerValidators, isValid } = require("../middlewares/validators");
const customer = require("../models/customer");

router.get("/", getAllCustomers);

router.post(
  "/new-customer",
  auth(["user"]),
  customerValidators.create,
  createCustomer
);

router.get(
  "/:id",
  auth(["item", "user"], customer),
  isValid.id,
  getCustomerById
);

router.delete(
  "/:id",
  auth(["item", "user"], customer),
  isValid.id,
  deleteCustomer
);

router.patch(
  "/:id",
  auth(["item", "user"], customer),
  isValid.id,
  customerValidators.update,
  updateCustomer
);

module.exports = router;
