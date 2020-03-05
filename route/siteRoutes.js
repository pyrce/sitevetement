const express = require("express");
const router = express();
const operationController = require("../controller/siteController.js");
const panierController = require("../controller/panierController.js");

router.get("/produits/ajout", operationController.ajout);
router.get("/produits/id", operationController.detail);
router.get("/:page", operationController.liste);
router.get("/", operationController.liste);
router.post("/produits/add",operationController.add)
router.get("/produits/modifier/:id",operationController.modifier)
router.put("/produits/:id",operationController.update)
router.delete("/produits/:id",operationController.delete)

router.get("/panier", panierController.liste);
module.exports = router;