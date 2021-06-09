const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: true },
  images: { type: Array, required: true },
  createdDate: { type: Date, required: true },
  lastModified: {
    type: Date,
    default: new Date().toISOString(),
  },
  //creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  creator: { type: String, required: true }, // user
});

module.exports = mongoose.model("Product", productSchema);
