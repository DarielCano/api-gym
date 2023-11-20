const { Model, Schema, model } = require("mongoose");

const ReportSchema = Schema({
  year: { type: String, required: true },
  dataMonth: {
    type: Array,
    required: true,
  },
  dataVisit: {
    type: Array,
    required: true,
  },
});

module.exports = model("Report", ReportSchema, "reports");
