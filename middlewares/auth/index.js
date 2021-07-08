/**
 * authenticate user role
 * @param {Object} restrict user role.
 */

module.exports = function (restrict) {
  return async (req, res, next) => {
    // get user role
    const role = req.role;
    if (!role)
      return res.status(403).json({
        message: "you are niot allowed!",
        success: false,
      });

    // check if user is admin
    if (req.requister === "user" && role.globalPerms) {
      // delete or patch item? check if this user created the item
      if (restrict.itemType) {
        const item = await getItemFromDB(restrict.itemType, req.params);

        if (item.user.toString() !== role.userId.toString())
          return res
            .status(403)
            .json({ message: "you are not allowed", success: false });

        return next();
      }

      // next if the user want to create item
      return next();
    }

    // check if user is customer (has access to create delete or update orders only!)
    if (role.privatePerms) {
      // check if this customer created the order
      if (restrict.itemType) {
        const item = await getItemFromDB(restrict.itemType);
        if (!item)
          return res.status(202).json({ success: false, message: "not found" });
        console.log(item);

        if (item.customer.toString() !== role.userId.toString())
          return res
            .status(403)
            .json({ message: "you are not allowed", success: false });

        return next();
      }

      return next();
    }
    return res
      .status(401)
      .json({ message: "you are not allowed", success: false });
  };
};

async function getItemFromDB(itemType, params) {
  let item;
  try {
    const { id, Schema } = getItemIdAndSchema(itemType);
    console.log(id);
    item = await Schema.findById(id);
  } catch (err) {
    return;
  }

  function getItemIdAndSchema(itemType) {
    let result;
    if (itemType === "product") {
      const Schema = require("../../models/product");
      return (result = {
        Schema,
        id: params.productId,
      });
    }

    if (itemType === "customer") {
      const Schema = require("../../models/product");
      return (result = {
        Schema,
        id: params.productId,
      });
    }

    if (itemType === "order") {
      const Schema = require("../../models/order");
      return (result = {
        Schema,
        id: params.productId,
      });
    }

    return result;
  }
}
