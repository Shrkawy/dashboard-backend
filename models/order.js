const { Schema, model } = require("mongoose");

const orderProductsSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    number: { type: Number, required: true },
    discount: Number,
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [orderProductsSchema],
    originalPrice: { type: Number, required: true },
    discount: { type: String, required: true },
    finalPrice: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
