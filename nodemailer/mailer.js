const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "m2003020@itcelaya.edu.mx",
    pass: "bnyr yozc mhrg ifmf ",
  },
});

module.exports = { transporter };
