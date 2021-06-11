const { checkSchema } = require("express-validator");

module.exports = checkSchema({
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
    },
    errorMessage: "invalid zip code",
  },
  email: {
    isEmail: true,
    normalizeEmail: {
      options: {
        all_lowercase: true,
      },
    },
    errorMessage: "invalid email",
  },
  phone: {
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