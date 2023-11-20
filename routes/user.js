const express = require("express");
const user = require("../controllers/user");

const router = express.Router();

/* rutas */

/* router.get("/prueba-conexion", user.prueba); */
router.post("/new-user", user.addUser);
router.get("/users", user.getUsers);
router.get("/user/:id", user.getUser);
router.delete("/remove-user/:id", user.deleteUser);
router.put("/user-update/:id", user.updateUser);
router.put("/update-date/:id", user.updateDate);

module.exports = router;
