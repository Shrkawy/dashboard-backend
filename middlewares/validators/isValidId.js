const { isValidObjectId } = require("mongoose");

/**
 * Return a 422 status code with error message if validation failed. if not proccess continue.
 *
 * @param {Object} req from middleware
 * @param {Promise} res from middleware
 */

module.exports = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) return res.sendStatus(422);
  next();
};