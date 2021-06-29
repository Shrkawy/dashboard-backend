const find = require("./db-find");
const findById = require("./db-findById");
const deleteOne = require("./db-delete");
const updateOne = require("./db-update");
const createOne = require("./db-createOne");

module.exports = {
  find,
  findById,
  deleteOne,
  updateOne,
  createOne,
};
