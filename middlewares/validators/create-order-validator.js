const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  products: {
    isArray: true,
    notEmpty: {
      options: (value) => value.length > 0,
    },
  },
  originalPrice: {
    isNumeric: true,
  },
  discount: {
    isNumeric: true,
  },
  finalPrice: {
    isNumeric: true,
  },
  status: {
    isString: true,
    trim: true,
  },
  customer: {
    exists: true,
  },
});
