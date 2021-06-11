const { Router } = require("express");

const router = Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customers-controllers");

const { customerValidators } = require("../middlewares/validators");

router.get("/", getAllCustomers);

router.post("/new-customer", customerValidators.create, createCustomer);

router.get("/:customerId", getCustomerById);

router.delete("/:customerId", deleteCustomer);

router.patch("/:customerId", customerValidators.update, updateCustomer);

module.exports = router;
