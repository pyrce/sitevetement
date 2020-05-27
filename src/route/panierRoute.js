const express = require("express");
const router = express();
const panierController = require("../controller/panierController.js");

router.get("/panier", panierController.liste);
module.exports = router;