const HttpError = require("../../middlewares/http-error");

/**
 * @description this function returns a database collection. if not founds it returns not found status.
 *
 * @param model the Shcema used to search in db
 * @param next from middleware
 * @param {Promise} res from middleware
 * @returns {Promise} database collection
 */

module.exports = async (model, res, next) => {
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

  if (!collection || collection.length === 0)
    return res.status(202).json(`not found`);

  return collection;
};
