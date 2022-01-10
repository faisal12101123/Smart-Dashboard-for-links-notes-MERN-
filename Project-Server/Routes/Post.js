const express = require("express");

const router = express.Router();

//import controller methods
const { create, noteList, read, update, remove } = require("../Controllers/Post");
const { requireSignin } = require("../Controllers/Auth");

router.post("/post", requireSignin, create);
router.get("/posts", requireSignin, noteList);
router.get("/posts/:slug", requireSignin, read);
router.put("/posts/:slug", requireSignin, update);
router.delete("/posts/:slug", requireSignin, remove);

module.exports = router;