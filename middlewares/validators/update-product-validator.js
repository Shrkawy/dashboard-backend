const { checkSchema } = require("express-validator");

module.exports = checkSchema({
    productName: {
      optional: { options: { nullable: true } },
      trim: true,
      isString: true,
    },
    category: {
      optional: { options: { nullable: true } },
      isString: true,
      trim: true,
    },
    subCategory: {
      optional: { options: { nullable: true } },
      isString: true,
      trim: true,
    },
    price: {
      optional: { options: { nullable: true } },
      isNumeric: true,
      exists: true,
    },
    originalPrice: {
      optional: { options: { nullable: true } },
      isNumeric: true,
    },
    stock: {
      optional: { options: { nullable: true } },
      isNumeric: true,
    },
    images: {
      optional: { options: { nullable: true } },
      isArray: true,
      notEmpty: {
        options: (value) => value.length > 0,
      },
    },
    description: {
      optional: { options: { nullable: true } },
      trim: true,
      isString: true,
    },
    tags: {
      optional: { options: { nullable: true } },
      isArray: true,
      notEmpty: {
        options: (value) => value.length > 0,
      },
    },
  });
  