const HttpError = require("../../middlewares/http-error");

/**
 * @description this function update a document in database. if not updated it returns an error.
 *
 * @param document that will update
 * @param {Object} modifications that will apply to original document in database
 * @param next from middleware
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
