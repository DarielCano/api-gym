const Report = require("../models/Report");

const setReportPrice = async (req, res) => {
  const visitPrice = req.body.priceVisit;
  const monthPrice = req.body.priceMonth;
  const repSend = {
    priceVisit: visitPrice,
    priceMonth: monthPrice,
    year: `${new Date().getFullYear()}`,
    dataVisit: [
      ["Enero", 0],
      ["Febrero", 0],
      ["Marzo", 0],
      ["Abril", 0],
      ["Mayo", 0],
      ["Junio", 0],
      ["Julio", 0],
      ["Agosto", 0],
      ["Septiembre", 0],
      ["Octubre", 0],
      ["Noviembre", 0],
      ["Diciembre", 0],
    ],
    dataMonth: [
      ["Enero", 0],
      ["Febrero", 0],
      ["Marzo", 0],
      ["Abril", 0],
      ["Mayo", 0],
      ["Junio", 0],
      ["Julio", 0],
      ["Agosto", 0],
      ["Septiembre", 0],
      ["Octubre", 0],
      ["Noviembre", 0],
      ["Diciembre", 0],
    ],
  };
  const rep = await Report.find({ year: `${new Date().getFullYear()}` }).exec();

  if (rep.length === 0) {
    const newReport = new Report(repSend);
    await newReport.save();
  } else {
    await Report.findOneAndUpdate(
      { year: `${new Date().getFullYear()}` },
      { priceVisit: visitPrice, priceMonth: monthPrice }
    ).exec();
  }

  return res.status(200).send({
    status: "success",
  });
};

const getReportPrice = async (req, res) => {
  const report = await Report.findOne({ year: `${new Date().getFullYear()}` });
  if (report.length == 0) {
    return res.status(200).send({
      status: "success",
      price: "0",
    });
  }
  return res.status(200).send({
    status: "success",
    priceVisit: report.priceVisit,
  });
};

const getReport = async (req, res) => {
  const report = await Report.findOne({ year: `${new Date().getFullYear()}` });

  res.status(200).send({
    status: "success",
    report: report,
  });
};

module.exports = {
  setReportPrice,

  getReport,
  getReportPrice,
};
