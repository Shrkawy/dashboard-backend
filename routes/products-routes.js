const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getProductbyId,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products-controllers");

const {
  productValidation,
  updateProductValidation,
} = require("../middlewares/validators");

router.get("/", getAllProducts);

router.post("/new-product", productValidation, createProduct);

router.get("/:productId", getProductbyId);

router.delete("/:productId", deleteProduct);

router.patch("/:productId", updateProductValidation, updateProduct);

module.exports = router;
