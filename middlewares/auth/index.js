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
    if (role.userType === "super-admin" && role.globalPerms) {
      // delete or patch item? check if this user created the item
      if (restrict?.itemType) {
        // must know itemType to get it's Schema and search for it in the DB

        let itemFromDB;
        try {
          itemFromDB = await getItemFromDB(restrict.itemType, req.params);
        } catch (err) {}

        if (itemFromDB?.user?.toString() !== role?.userId?.toString()) {
          return res
            .status(403)
            .json({ message: "you are not allowed", success: false });
        }

        if (!itemFromDB)
          return res.status(202).json({
            message: "user not found!",
            success: false,
          });

        req.item = itemFromDB;
        return next();
      }

      // create order case! the customer must be belong to the user
      if (req.params.customerId) {
        const id = req.params.customerId;
        const Customer = require("../../models/customer");
        let customer;

        try {
          customer = await Customer.findById(id);
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: "something went wrong, please try again later!",
          });
        }

        if (!customer)
          return res.status(202).json({
            success: false,
            message: "customer not found!",
          });

        if (customer.user.toString() !== role.userId.toString()) {
          return res.status(403).json({
            success: false,
            message: "you are not allowed!",
          });
        }
      }

      // create item .. user must has the same id in params
      if (req.params.userId !== role.userId.toString()) {
        return res
          .status(403)
          .json({ message: "you are not allowed", success: false });
      }

      return next();
    }

    // check if user is customer (has access to create delete or update orders only!)
    if (role.privatePerms) {
      // check if this customer created the order
      if (restrict?.itemType) {
        const itemFromDB = await getItemFromDB(restrict.itemType, req.params);
        if (!itemFromDB)
          return res.status(202).json({ success: false, message: "not found" });

        if (
          (itemFromDB.customer?.toString() || itemFromDB._id.toString()) !==
          role.userId.toString()
        ) {
          return res
            .status(403)
            .json({ message: "you are not allowed", success: false });
        }

        req.item = itemFromDB;
        return next();
      }

      console.log(req.params.customerId, role.userId.toString());
      if (req.params.customerId !== role.userId.toString())
        return res
          .status(403)
          .json({ message: "you are not allowed", success: false });

      return next();
    }

    return res
      .status(401)
      .json({ message: "you are not allowed", success: false });
  };
};

async function getItemFromDB(itemType, params) {
  let item, id;

  if (itemType === "customer") {
    item = require("../../models/customer");
    id = params.customerId;
  }
  if (itemType === "product") {
    item = require("../../models/product");
    id = params.productId;
  }
  if (itemType === "order") {
    item = require("../../models/order");
    id = params.orderId;
  }

  let itemFromDB;
  try {
    itemFromDB = await item.findById(id);
  } catch (err) {
    return;
  }

  return itemFromDB;
}
