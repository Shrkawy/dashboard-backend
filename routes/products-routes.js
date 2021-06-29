const { Router } = require("express");

const router = Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products-controllers");

const auth = require("../middlewares/auth");
const Product = require("../models/product");

const { productValidators, isValid } = require("../middlewares/validators");

router.get("/", getAllProducts);

router.post(
  "/new-product",
  auth(["user", Product]),
  productValidators.create,
  createProduct
);

router.get("/:id", auth(["item"], Product), getProductById);

router.delete("/:id", auth(["item"], Product), deleteProduct);

router.patch(
  "/:id",
  auth(["item"], Product),
  productValidators.update,
  updateProduct
);

module.exports = router;
