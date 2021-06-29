const { Router } = require("express");
const router = Router();

const { signup, login } = require("../controllers/users-controllers");

const { userValidators } = require("../middlewares/validators");

router.post("/signup", userValidators.signup, signup);

router.post("/login", userValidators.login, login);

router.get("/:id/products");

router.get("/:id/customers");

router.get("/id:/employees");

module.exports = router;
