const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    store: { type: String, required: true },
    currency: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
