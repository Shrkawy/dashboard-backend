const HttpError = require("../../middlewares/http-error");

/**
 *  Returns a database collection.
 * @async
 *
 * @param model the Shcema used to search in db
 * @param next from middleware
 *
 * @returns {Promise} database collection or not found message.
 */

module.exports = async (model, next) => {
  let collection;

  try {
    collection = await model.find();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong, please try again later",
      500
    );
    return next(error);
  }

  return collection;
};
