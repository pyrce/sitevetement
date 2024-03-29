const express = require("express");
const router = express();
var timeout = require('connect-timeout')

const operationController = require("../controller/siteController.js");
const panierController = require("../controller/panierController.js");
const comController=require("../controller/commentsController.js");
const catController=require("../controller/categoriesController.js");
const userController=require("../controller/usersController.js")
const paiementController=require("../controller/paiementController.js");

router.get("/connection",userController.connect)
router.post("/login",userController.login);
router.get("/deconnection",userController.deconnection)

router.get("/",operationController.liste);
router.put("/commentaires", comController.ajout);
router.get("/commentaires", comController.liste);
router.post("/commentaires/:id", comController.update);
router.delete("/commentaires/:id", comController.removeCom);

router.get("/categories", catController.liste);
router.post("/categories", catController.insert);
router.post("/categories/:id", catController.update);
router.put("/categories/:id", catController.updateetat);
router.delete("/categories/:id", catController.remove);

router.get("/panier", panierController.liste);
router.post("/panier", panierController.ajout);
router.put("/panier/:id",panierController.update);
router.delete("/panier/:id",panierController.delete);

router.get("/produits/gerer", operationController.gerer);
router.get("/produits/ajout", operationController.ajout);
router.get("/produits/:id", operationController.detail);
router.post("/",operationController.listeproduits)
router.get("/:page",operationController.liste)
router.post("/produits/add",operationController.add)
router.get("/produits/modifier/:id",operationController.modifier)
router.post("/produits/:id",operationController.update)
router.delete("/produits/:id",operationController.delete)

router.post("/my-api/login/",paiementController.login);
router.post("/my-api/create-payment/",paiementController.createpaiement);
router.post("/my-api/execute-payment/",paiementController.executepaiement);


module.exports = router;
