const { transporter } = require("../nodemailer/mailer");
const User = require("../models/User");

async function mail(user) {
  const info = await transporter.sendMail({
    from: "m2003020@itcelaya.edu.mx", // sender address
    to: user.email, // list of receivers
    subject: "Pago de Mensualidad", // Subject line
    text: `Hola ${user.name} ${user.surname}. Le informamos por este medio que debe realizar el pago correspondiente a este mes. 
           Saludos cordiales.
           Equipo de Apocalypsis Gym`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

async function sendMail(user) {
  const today = new Date();
  const userList = await User.find({});
  userList.map((user) => {
    if (user.email && user.email !== "") {
      if (
        user.nextPay.getMonth() <= today.getMonth() &&
        user.nextPay.getDate() < today.getDate()
      ) {
        mail(user);
      }
    }
  });
}

module.exports = { sendMail };
