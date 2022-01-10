const express = require("express");

const router = express.Router();

//import controller methods
const { login } = require("../Controllers/Auth");

router.post("/login", login);

module.exports = router;