const jwt = require("jsonwebtoken");
const HttpError = require("../middlewares/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new HttpError("Authentication Failed!", 401);

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = {
      id: decodedToken.userId,
    };
    next();
  } catch (err) {
    return next(new HttpError("Authentication Failed!", 403));
  }
};
