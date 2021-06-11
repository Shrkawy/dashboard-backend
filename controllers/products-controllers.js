const Product = require("../models/product");
const { find, findById, createOne } = require("../utils/database");
const { validationResult } = require("../utils/validation");

exports.getAllProducts = async (req, res, next) => {
  const products = await find(Product, res, next);

  return res
    .status(200)
    .json(products.map((product) => product.toObject({ getters: true })));
};

exports.getProductbyId = async (req, res, next) => {
  const id = req.params.productId;

  const product = await findById(id, Product, res, next);

  return res.status(200).json(product.toObject({ getters: true }));
};

exports.createProduct = async (req, res, next) => {
  validationResult(req, res);

  let createdProduct = await createOne(req, next, Product);

  return res.status(201).json({ product: createdProduct });
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.productId;

  await findById(id, Product, res);
  await deleteOne(id, Product, res);

  return res.status(200).json("deleted");
};

exports.updateProduct = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.productId;

  const modifications = req.body;

  let product = await findById(id, Product, next);

  product = await update(product, modifications, next);

  return res.status(200).json(product);
};
