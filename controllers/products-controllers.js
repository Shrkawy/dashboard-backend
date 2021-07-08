const Product = require("../models/product");
const { validationResult } = require("../utils/validation");

exports.getAllProducts = async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) return res.statusCode(400);

  let products;
  try {
    products = await Product.find({ user: userId });
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!products || products.length === 0)
    return res.status(202).json("no products found");

  return res
    .status(200)
    .json(products.map((product) => product.toObject({ getters: true })));
};

exports.getProductById = async (req, res, next) => {
  const id = req.params.productId;

  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again later",
    });
  }

  if (!product)
    return res
      .status(202)
      .json({ success: false, message: "product not found" });

  return res.status(200).json(product.toObject({ getters: true }));
};

exports.createProduct = async (req, res, next) => {
  validationResult(req, res);
  console.log(req.params);
  let createdProduct = new Product(req.body);
  createdProduct.user = req.params.userId;

  let product;
  try {
    product = await createdProduct.save();
  } catch (err) {
    return res.status(500);
  }

  return res.status(201).json({ product });
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.productId;

  let product;
  try {
    product = await Product.findByIdAndDelete(id);
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!product) return res.status(202).json("product not found");

  return res.status(200).json("deleted");
};

exports.updateProduct = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.productId;

  const modifications = req.body;

  let product;
  try {
    product = await Product.findByIdAndUpdate(id, modifications, { new: true });
  } catch (err) {
    return res.sendStatus(500);
  }

  if (!product) return res.status(202).json("product not found");

  return res.status(201).json(product);
};
