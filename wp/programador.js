const cron = require("node-cron");
const { enviarMensaje } = require("./mensaje.js");
const User = require("../models/User");
const CONTACTO = "5214737370264@c.us";
const MSG = "";

async function programador_tareas(cliente) {
  const today = new Date();
  const userList = await User.find({});

  userList.map((user) => {
    if (
      user.nextPay.getMonth() <= today.getMonth() &&
      user.nextPay.getDate() < today.getDate()
    ) {
      enviarMensaje(
        cliente,
        `521${user.phone}@c.us`,
        `Hola ${user.name}. Por este medio le informamos que debe realizar el pago correspondiente a este mes. Saludos, GYM Apocalipsys💪`
      ).then(console.log("Mensaje enviado"));
    }
  });
}

module.exports = {
  programador_tareas,
};
