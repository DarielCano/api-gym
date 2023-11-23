const express = require("express");
const report = require("../controllers/report");

const router = express.Router();

router.get("/report", report.getReport);

router.get("/price-report", report.getReportPrice);
router.post("/price-report", report.setReportPrice);

module.exports = router;
