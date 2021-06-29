module.exports = {
  userValidators: {
    signup: require("./signup-validator"),
    login: require("./login-validator"),
  },
  productValidators: {
    create: require("./create-product-validator"),
    update: require("./update-product-validator"),
  },
  customerValidators: {
    create: require("./create-customer-validator"),
    update: require("./update-customer-validator"),
  },
  orderValidators: {
    create: require("./create-order-validator"),
    update: require("./update-order-validator"),
  },
  isValid: {
    id: require("./isValidId"),
  },
};
