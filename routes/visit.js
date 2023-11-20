const express = require("express");
const visit = require("../controllers/visit");

const router = express.Router();

/* rutas */

/* router.get("/prueba-conexion", user.prueba); */
router.post("/new-visit", visit.addVisit);
router.get("/visits", visit.getAllVisit);
router.get("/visits/report/:id", visit.exportVisit);

module.exports = router;
