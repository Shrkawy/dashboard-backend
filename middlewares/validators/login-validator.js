const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  username: {
    exists: true,
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
      errorMessage: "invalid password",
    },
  },
});
