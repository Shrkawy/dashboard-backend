const { Router } = require("express");
const passport = require("passport");

const router = Router({ mergeParams: true });

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products-controllers");

const { productValidators } = require("../middlewares/validators");
const auth = require("../middlewares/auth");

const passportAuth = passport.authenticate("jwt", { session: false }),
  itemType = "product";

router.get("/", getAllProducts);

router.post("/", passportAuth, auth(), productValidators.create, createProduct);

router.get("/:productId", getProductById);

router.delete("/:productId", passportAuth, auth({ itemType }), deleteProduct);

router.patch(
  "/:productId",
  passportAuth,
  auth({ itemType }),
  productValidators.update,
  updateProduct
);

module.exports = router;
