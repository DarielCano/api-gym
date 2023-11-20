const { Schema, model } = require("mongoose");

const VisitSchema = Schema({
  visitDate: {
    type: String,
    required: true,
  },

  users: {
    type: Array,
    required: true,
  },
});

module.exports = model("Visit", VisitSchema, "visits");
