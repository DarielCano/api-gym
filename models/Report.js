const { model, Schema } = require("mongoose");

const ReportSchema = Schema({
  year: { type: String, required: true },
  dataMonth: {
    type: Array,
    required: true,
  },
  priceVisit: { type: String },
  priceMonth: { type: String },
  dataVisit: {
    type: Array,
    required: true,
  },
});

module.exports = model("Report", ReportSchema, "reports");
