const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  registerDate: {
    type: Date,
    required: true,
  },
  lastModified: {
    type: Date,
    default: new Date().toISOString(),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  cridetCard: { type: Object, required: false },
  activity: { type: Object, required: false },
  // orders
  // user
});

module.exports = mongoose.model("Customer", customerSchema);
