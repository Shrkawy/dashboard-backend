const HttpError = require("../../middlewares/http-error");

module.exports = async (id, model, next) => {
  try {
    await model.deleteOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "something went wrong, please try again later!"
    );
    return next(error);
  }
};
