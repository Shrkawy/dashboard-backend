const HttpError = require("../../middlewares/http-error");

/**
 * Delete a single document by its _id field in database.
 *
 * @param {String} id document id
 * @param Model model Schema
 * @param next from middleware
 *
 * @returns error if failed
 */

module.exports = async (id, Model, next) => {
  try {
    await Model.deleteOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later!"
    );
    return next(error);
  }
};
