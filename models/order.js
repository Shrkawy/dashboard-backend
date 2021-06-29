const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: { type: Array, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: String, required: true },
    finalPrice: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
