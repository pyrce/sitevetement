const express = require("express");
const router = express();
const operationController = require("../controller/UrlController.js");

router.get("/produits/ajout", operationController.ajout);
router.get("/", operationController.list);

module.exports = router;
