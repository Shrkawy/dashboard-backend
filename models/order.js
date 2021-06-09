const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: { type: String, required: true },
  createdDate: { type: Date, required: true },
  lastModified: { type: Date, default: new Date().toISOString() },
  products: { type: Array, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
