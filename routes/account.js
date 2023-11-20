const express = require("express");
const account = require("../controllers/account");

const router = express.Router();

router.post("/account/login", account.login);
router.post("/account/register", account.register);
router.get("/account/users", account.getAccountUsers);
router.put("/account/edit", account.editAccountRoles);

module.exports = router;
