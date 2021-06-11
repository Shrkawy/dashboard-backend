const { checkSchema } = require("express-validator");

module.exports = checkSchema({
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
      },
      errorMessage: "invalid zip code",
    },
    email: {
      optional: { options: { nullable: true } },
      isEmail: true,
      normalizeEmail: {
        options: {
          all_lowercase: true,
        },
      },
      errorMessage: "invalid email",
    },
    phone: {
      optional: { options: { nullable: true } },
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