const { Router } = require("express");

const router = Router();

const {
  getAllProducts,
  getProductbyId,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products-controllers");

const { productValidators } = require("../middlewares/validators");

router.get("/", getAllProducts);

router.post("/new-product", productValidators.create, createProduct);

router.get("/:productId", getProductbyId);

router.delete("/:productId", deleteProduct);

router.patch("/:productId", productValidators.update, updateProduct);

module.exports = router;
