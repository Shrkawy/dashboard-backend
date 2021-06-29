/**
 * check auth for create, delete or update item returns true if the user is autherized
 * @param {Object} item the item which user requested
 * @param {Object} userRole user role
 * @param {String} userId user id
 * @param {String} itemId item id
 *
 * @returns Boolean
 */
exports.itemAuth = (item, userRole, userId, itemId) => {
  const { globalPerms, privatePerms } = userRole;
  const { user, customer } = item;


  if (!globalPerms && !privatePerms) return false;

  // create item auth
  if (!itemId) return true;

  // golbalPerms (USER ONLY can do { EDIT || DELETE, UPDATE }) => products, orders, customers and dashboard analytics.
  if (globalPerms) {
    // check if this item has a user who created it {always true}
    if (!user) return false;

    // check if item has same userId
    if (user != userId) return false;
    return true;
  }

  // privatePerms (customer can do) => orders only!
  if (privatePerms) {
    // check if this item has a user who created it {always true}
    if (!customer) return false;

    // check if item has the same userId
    if (customer != userId) return false;

    return true;
  }

  return false;
};

exports.userAuth = (userId, userRole) => {
  const { privatePerms, globalPerms } = userRole;

  if (privatePerms || globalPerms) return true;

  return false;
};
