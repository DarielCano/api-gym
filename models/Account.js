const { model, Schema } = require("mongoose");

const AccountSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
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
  nickname: {
    type: String,
    required: true,
  },
  role: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Account", AccountSchema, "accounts");
