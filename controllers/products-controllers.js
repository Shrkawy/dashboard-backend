const Product = require("../models/product");
const {
  find,
  findById,
  createOne,
  updateOne,
  deleteOne,
} = require("../utils/database");
const { validationResult } = require("../utils/validation");

exports.getAllProducts = async (req, res, next) => {
  const products = await find(Product, next);

  if (!products || products.length === 0)
    return res.status(202).json(`not found`);

  return res
    .status(200)
    .json(products.map((product) => product.toObject({ getters: true })));
};

exports.getProductById = async (req, res, next) => {
  const id = req.params.id;

  const product = await findById(id, Product, next);

  if (!product) return res.status(202).json("not found!");

  return res.status(200).json(product.toObject({ getters: true }));
};

exports.createProduct = async (req, res, next) => {
  validationResult(req, res);
  let createdProduct = new Product(req.body);
  createdProduct.user = req.userId;

  let product;
  try {
    product = await createdProduct.save();
  } catch (err) {
    return res.status(500);
  }

  return res.status(201).json({ product });
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  const product = await findById(id, Product, next);

  if (!product) return res.status(202).json("not found");

  await deleteOne(id, Product, next);

  return res.status(200).json("deleted");
};

exports.updateProduct = async (req, res, next) => {
  validationResult(req, res);

  const id = req.params.id;

  const modifications = req.body;

  let product = await findById(id, Product, next);

  if (!product) return res.status(202).json("not found");

  product = await updateOne(product, modifications, next);

  return res.status(200).json(product);
};
