const HttpError = require("../../middlewares/http-error");

/**
 * Create new document in database.
 * @param req from middleware
 * @param next from middleware
 * @param Model Shcema Model
 *
 * @returns created document
 */

module.exports = async (req, next, Model) => {
  const createdDocument = new Model(req.body);

  let responce;

  try {
    responce = await createdDocument.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong, please try again later",
      500
    );
    return next(error);
  }

  return responce;
};
