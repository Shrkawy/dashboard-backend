const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  productName: {
    trim: true,
    isString: true,
  },
  category: {
    isString: true,
    trim: true,
  },
  subCategory: {
    isString: true,
    trim: true,
  },
  price: {
    isNumeric: true,
    exists: true,
  },
  originalPrice: {
    isNumeric: true,
  },
  stock: {
    isNumeric: true,
  },
  images: {
    isArray: true,
    notEmpty: {
      options: (value) => value.length > 0,
    },
  },
  description: {
    trim: true,
    isString: true,
  },
  tags: {
    isArray: true,
    notEmpty: {
      options: (value) => value.length > 0,
    },
  },
});
