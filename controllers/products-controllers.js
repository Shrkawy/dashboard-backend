const mongoose = require("mongoose");
const Product = require("../models/product");
const HttpError = require("../middlewares/http-error");
const { validationResult } = require("express-validator");

exports.getAllProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      "faild to load products, please try again later",
      500
    );
    return next(error);
  }

  if (!products) return res.status(202).json("no products found");

  return res
    .status(200)
    .json(products.map((product) => product.toObject({ getters: true })));
};

exports.getProductbyId = async (req, res, next) => {
  const productId = req.params.productId;

  if (!mongoose.isValidObjectId(productId))
    return res.status(422).json("no product found");

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("could not find this product", 500);
    return next(error);
  }

  if (!product) return res.status(202).json("Product not found!");

  return res.status(200).json(product.toObject({ getters: true }));
};

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.mapped());

  const {
    productName,
    category,
    subCategory,
    price,
    originalPrice,
    stock,
    createdDate,
    images,
    description,
    tags,
    creator,
  } = req.body;

  let user;

  const createdProduct = new Product({
    productName,
    category,
    subCategory,
    price,
    originalPrice,
    stock,
    createdDate,
    images,
    description,
    tags,
    creator,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("failed to create a product", 500);
    return next(error);
  }

  return res.status(201).json({ product: createdProduct });
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.productId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("no product found");

  let product;

  try {
    product = await Product.findByIdAndDelete(id);
  } catch (err) {
    const error = new HttpError(
      "something went wrong please try again later!",
      500
    );
    return next(error);
  }

  if (!product) return res.status(202).json("no product");

  return res.status(200).json("deleted");
};

exports.updateProduct = async (req, res, next) => {
  const id = req.params.productId;

  if (!mongoose.isValidObjectId(id))
    return res.status(422).json("no product found");

  const errors = validationResult(req);

  if (!errors.isEmpty() || Object.keys(req.body).length === 0) {
    return res
      .status(422)
      .json(
        errors.isEmpty()
          ? "you can not update this product with no changes"
          : errors.mapped()
      );
  }

  let product;

  try {
    product = await Product.findById(id);
  } catch (err) {
    return next(new HttpError("somthing went wrong, please try again later!"));
  }

  if (!product) return res.status(202).json("no product to be updated");

  const modProduct = req.body;
  modProduct.lastModified = new Date().toISOString();

  for (const [key, value] of Object.entries(modProduct)) {
    product[key] = value;
  }

  try {
    product = await product.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).json(product);
};
