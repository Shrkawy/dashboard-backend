const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  products: {
    optional: { options: { nullable: true } },
    isArray: true,
    notEmpty: {
      options: (value) => value.length > 0,
    },
  },
  originalPrice: {
    optional: { options: { nullable: true } },
    isNumeric: true,
  },
  discount: {
    optional: { options: { nullable: true } },
    isNumeric: true,
  },
  finalPrice: {
    optional: { options: { nullable: true } },
    isNumeric: true,
  },
  status: {
    optional: { options: { nullable: true } },
    isString: true,
    trim: true,
  },
});
