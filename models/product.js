const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    images: { type: Array, required: true },
    //creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    creator: { type: String, required: true }, // user
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
