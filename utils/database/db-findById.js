const { isValidObjectId } = require("mongoose");
const HttpError = require("../../middlewares/http-error");

/**
 * Find a single document by its _id field in database.
 *
 * @param id document id
 * @param model the Schema of this document
 * @param next from middleware
 *
 * @returns document from database
 */

module.exports = async (id, model, next) => {

  let document;

  try {
    document = await model.findById(id);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }

  return document;
};
