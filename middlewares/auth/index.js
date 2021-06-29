const { verify } = require("jsonwebtoken");
const Role = require("../../models/role");
const HttpError = require("../http-error");

const { itemAuth, userAuth } = require("./auth-controllers");

/**
 * authenticate user token and role
 * @param {Array} restrict user role.
 * @param itemSchema database Schema.
 */

module.exports = (restrict, itemSchema) => {
  return async (req, res, next) => {
    // check token
    if (!req.headers.authorization) return res.status(401).json("not allowed");

    const token = req.headers.authorization.split(" ")[1];
    if (!token) next(new HttpError("not allowed", 401));

    const decodedToken = verify(token, process.env.SECRET_KEY, (err) => {});

    if (!decodedToken) {
      return res.status(401).json({ message: "please login", success: false });
    }

    const { userId, role } = decodedToken;

    // get user ROLE
    let userRole;
    try {
      userRole = await Role.findById(role);
    } catch (err) {
      next(new HttpError("something went wrong!", 500));
    }

    // no role found or id in role not equal to id in token
    if (!userRole || userRole.userId != decodedToken.userId) {
      return next(new HttpError("not allowed", 403));
    }

    if (restrict.includes("item")) {
      const itemId = req.params.id;
      if (!itemId) return res.status(202).json("not found");

      // get item from DB
      let item;
      try {
        item = await itemSchema.findById(itemId);
      } catch (err) {
        return res
          .status(500)
          .json("something went wrong, please try again later");
      }

      if (!item) return res.status(202).json("not found");

      if (itemAuth(item, userRole, userId, itemId)) {
        req.userId = userId;
        req.item = itemId;
        return next();
      }

      return next(new HttpError("not allowed", 403));
    }

    if (restrict.includes("user")) {
      if (userAuth(userId, userRole)) {
        if (userRole.userType === "customer") req.customer = userId;
        if (userRole.userType === "user") req.user = userId;
        return next();
      }
      return next(new HttpError("not allowed"), 403);
    }

    return next(new HttpError("authenticaion failed", 403));
  };
};
