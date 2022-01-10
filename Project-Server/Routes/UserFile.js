const express = require("express");

const router = express.Router();

//import controller methods
const { userFile } = require("../Controllers/UserFile");

router.post("/reg", userFile);

module.exports = router;