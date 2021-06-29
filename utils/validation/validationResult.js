const { validationResult } = require("express-validator");

/**
 * Return a 422 status code with error message if validation failed. if not proccess continue.
 *
 * @param {Object} req from middleware
 * @param {Promise} res from middleware
 */

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty() || Object.keys(req.body).length === 0) {
    return res
      .status(422)
      .json(errors.isEmpty() ? "no changes found" : errors.mapped());
  }

  return;
};
