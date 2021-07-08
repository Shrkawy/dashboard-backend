const { Router } = require("express");

const router = Router({ mergeParams: true });

const { signup, login } = require("../controllers/users-controllers");

const { userValidators } = require("../middlewares/validators");

router.post("/signup", userValidators.signup, signup);

router.post("/login", userValidators.login, login);

module.exports = router;
