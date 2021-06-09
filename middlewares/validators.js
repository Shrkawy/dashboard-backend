const { checkSchema } = require("express-validator");
const HttpError = require("./http-error");

exports.customerValidation = checkSchema({
  registerDate: {
    isISO8601: true,
    default: new Date().toISOString(),
  },
  firstName: {
    trim: true,
    errorMessage: "must provide your first name",
  },
  lastName: {
    trim: true,
    errorMessage: "must provide your last name",
  },
  birthDate: {
    isISO8601: true,
    errorMessage: "invalid birth date",
  },
  country: {
    trim: true,
    isString: true,
  },
  address1: {
    trim: true,
    isString: true,
    errorMessage: "not valid address",
  },
  address2: {
    optional: { options: { nullable: true } },
    trim: true,
    isString: true,
    errorMessage: "not valid address",
  },
  zipCode: {
    isLength: {
      options: { min: 5 },
      errorMessage: "invalid zip code",
    },
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "invalid email",
  },
  phone: {
    notEmpty: true,
    isNumeric: true,
    isMobilePhone: true,
    isLength: {
      options: {
        min: 9,
      },
    },
    errorMessage: "Not valid phone number",
  },
});

exports.updateCustomerValidation = checkSchema({
  firstName: {
    optional: { options: { nullable: true } },
    trim: true,
    errorMessage: "must provide your first name",
  },
  lastName: {
    optional: { options: { nullable: true } },
    trim: true,
    errorMessage: "must provide your last name",
  },
  birthDate: {
    optional: { options: { nullable: true } },
    isISO8601: true,
    errorMessage: "invalid birth date",
  },
  country: {
    optional: { options: { nullable: true } },
    trim: true,
    isString: true,
  },
  address1: {
    optional: { options: { nullable: true } },
    trim: true,
    isString: true,
    errorMessage: "not valid address",
  },
  zipCode: {
    optional: { options: { nullable: true } },
    isLength: {
      options: { min: 5 },
      errorMessage: "invalid zip code",
    },
  },
  email: {
    optional: { options: { nullable: true } },
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "invalid email",
  },
  phone: {
    optional: { options: { nullable: true } },
    notEmpty: true,
    isNumeric: true,
    isMobilePhone: true,
    isLength: {
      options: {
        min: 9,
      },
    },
    errorMessage: "Not valid phone number",
  },
});

exports.orderValidation = checkSchema({
  createdDate: {
    isISO8601: true,
  },
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

exports.updateOrderValidation = checkSchema({
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

exports.productValidation = checkSchema({
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
  createdDate: {
    isISO8601: true,
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
  creator: {
    exists: true,
  },
});

exports.updateProductValidation = checkSchema({
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

// const validateAddress = async (value, req) => {
//   const country = req.body.country;
//   const state = req.body.state;
//   const city = req.body.city;
//   const zip = req.body.zipCode;
//   const address = value.replace(/\s/g, "&");
//   const API_URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODING_API_TOKEN}&format=json&postalcode=${zip}&country=${country}&state=${state}&$city=${city}&name=${address}`;
//   console.log("here");
//   try {
//     res = await fetch(API_URL);
//     console.log(res);
//     if (res.length > 0) return true;
//   } catch (err) {
//     throw new HttpError("something went wrong, please try again later.", 500);
//   }

//   return false;
// };
