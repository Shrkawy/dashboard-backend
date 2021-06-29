const HttpError = require("../../middlewares/http-error");

/**
 * Update a document in database.
 *
 * @param document that will update
 * @param {Object} modifications that will apply to original document in database
 * @param next from middleware
 * 
 * @returns updated document or error
 */

module.exports = async (document, modifications, next) => {
  for (const [key, value] of Object.entries(modifications)) {
    document[key] = value;
  }

  try {
    document = await document.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return document;
};
