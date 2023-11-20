const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  incomeDate: {
    type: Date,
    default: Date.now(),
  },
  nextPay: {
    type: Date,
  },
});

module.exports = model("User", UserSchema, "users");
