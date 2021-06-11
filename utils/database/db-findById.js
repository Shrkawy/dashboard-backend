const { isValidObjectId } = require("mongoose");
const HttpError = require("../../middlewares/http-error");

/**
 * @description custom middleware to find a single document by its _id field in database. if not founds it returns not found status.
 *
 * @param {String} id document id
 * @param model the Schema of this document
 * @param {Promise} res from middleware
 * @param next from middleware
 *
 * @returns {Promise} document from database
 */

module.exports = async (id, model, res, next) => {
  if (!isValidObjectId(id)) return res.status(422).json("no product found");

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

  if (!document) return res.status(202).json(`not found!`);

  return document;
};
