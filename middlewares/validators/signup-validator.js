const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  username: {
    trim: true,
    isString: true,
    isLength: {
      options: {
        min: 6,
      },
    },
    errorMessage: "invalid username",
  },
  password: {
    isStrongPassword: {
      options: {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
      },
    },
    errorMessage: "invalid password",
  },
  firstName: {
    isString: true,
    trim: true,
    errorMessage: "invalid first name",
  },
  lastName: {
    isString: true,
    trim: true,
    errorMessage: "invalid last name",
  },
  gender: {
    isString: true,
    trim: true,
    errorMessage: "invalid gender",
  },
  birthDate: {
    isISO8601: true,
    trim: true,
  },
  email: {
    isEmail: true,
    normalizeEmail: {
      options: {
        all_lowercase: true,
        gmail_remove_dots: false,
      },
    },
    errorMessage: "invalid email",
  },
  phone: {
    isMobilePhone: true,
    isLength: {
      options: { min: 9 },
    },
    errorMessage: "invalid phone number",
  },
  store: {
    isString: true,
    trim: true,
  },
  currency: {
    isString: true,
    isLength: { options: { min: 2 } },
    errorMessage: "invalid currency",
  },
  country: {
    isString: true,
    trim: true,
    isLength: { options: { min: 2 } },
    errorMessage: "invalid country",
  },
  city: {
    isString: true,
    trim: true,
    errorMessage: "invalid city",
  },
  address: {
    isString: true,
    trim: true,
    isLength: { options: { min: 8 } },
    errorMessage: "invalid address",
  },
  zipCode: {
    isNumeric: true,
    isLength: { min: 5 },
    errorMessage: "invalid zip code",
  },
});
