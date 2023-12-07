const { connection } = require("./database/connection");
const express = require("express");

const cors = require("cors");
const { sendMail } = require("./middleware/sendMails");
const { startAPI } = require("./wp/api.js");
const { programador_tareas } = require("./wp/programador.js");
const { prueba } = require("./wp/prueba");

/* conexion a base de datos */
connection();

/*enviar mensaje wp para solicitar pago */
(async () => {
  try {
    const cliente = await startAPI();
    programador_tareas(cliente);
  } catch (error) {
    console.log("Error en index", error);
  }
})();

/* enviar email para solicitar pago */
/* sendMail(); */
/* crear servidor de node */
const app = express();
const port = 4468;

/* configurar cors */
app.use(cors());

/* convertir body a objeto de js */
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

/* app.use(() => sendMail()); */
/////////////////////////////////////////////////////////////
/* crear rutas de prueba */
/* app.get("/probando", (req, res) => {
  console.log("Se ha ejecutado el endpoint probando");
  return res.status(200).json({
    nombre: "Gym Apocalipsis",
    autor: "Dariel Cano",
    year: 2023,
  });
}); */

/* crear rutas reales */
const routesUser = require("./routes/user");
const routesVisit = require("./routes/visit");
const routesAccount = require("./routes/account.js");
const routesReport = require("./routes/report.js");

app.use("/api", routesUser);
app.use("/api", routesVisit);
app.use("/api", routesAccount);
app.use("/api", routesReport);

/* crear servidor y escuchar peticiones http */
app.listen(port, () => {
  console.log("servidor corriendo en el puerto " + port);
});
