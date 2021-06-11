const { validationResult } = require("express-validator");

/**
 * @description return a responce of validation errors if found. if not it retruns
 *
 * @param req from middleware
 * @param res from middleware
 */

module.exports = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || Object.keys(req.body).length === 0) {
    return res
      .status(422)
      .json(
        errors.isEmpty()
          ? "no changes found"
          : errors.mapped()
      );
  }
  return;
};
