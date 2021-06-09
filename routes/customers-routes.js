const express = require("express");

const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers-controllers");

const {
  customerValidation,
  updateCustomerValidation,
} = require("../middlewares/validators");

router.get("/", getAllCustomers);

router.post("/new-customer", customerValidation, createCustomer);

router.get("/:customerId", getCustomerById);

router.delete("/:customerId", deleteCustomer);

router.patch("/:customerId", updateCustomerValidation, updateCustomer);

module.exports = router;
