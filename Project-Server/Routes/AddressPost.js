const express = require("express");

const router = express.Router();

//import controller methods
const { create, linkList, read, update, remove } = require("../Controllers/AddressPost");
const { requireSignin } = require("../Controllers/Auth");

router.post("/address", requireSignin, create);
router.get("/links", requireSignin, linkList);
router.get("/links/:_id", requireSignin, read);
router.put("/links/:_id", requireSignin, update);
router.delete("/links/:_id", requireSignin, remove);


module.exports = router;