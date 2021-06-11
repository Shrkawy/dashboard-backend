const HttpError = require("../../middlewares/http-error");

/**
 * @description create new document in database.
 * @param req from middleware
 * @param next from middleware
 * @param Model Shcema Model
 */

module.exports = async (req, next, Model) => {
  const createdDocument = new Model(req.body);

  try {
    await createdDocument.save();
  } catch (err) {
    const error = new HttpError(
      "failed to create order, please try again later",
      500
    );
    return next(error);
  }

  return createdDocument;
};
