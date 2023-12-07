const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mariadelpilar.glez97@gmail.com",
    pass: "zwgz crke ucmh ummq",
  },
});

module.exports = { transporter };
