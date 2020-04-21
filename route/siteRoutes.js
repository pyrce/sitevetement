const express = require("express");
const router = express();
const operationController = require("../controller/siteController.js");
const panierController = require("../controller/panierController.js");
const comController=require("../controller/commentsController.js");
const catController=require("../controller/categoriesController.js");
const userController=require("../controller/usersController.js")

//module.exports = function (app, passport) {

  /*  router.post("/login",passport.authenticate('local-login',{
    failureRedirect: '/login',
    failureFlash: true }),(req,res)=>{res.redirect("/")});
router.get("/login",(req,res)=>{res.render("login")})*/

router.get("/", operationController.liste);
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

router.get("/", operationController.liste);
router.get("/:page", operationController.liste);

router.get("/produits/ajout", operationController.ajout);
router.get("/produits/:id", operationController.detail);
router.post("/",operationController.listeproduits)
router.post("/produits/add",operationController.add)
router.get("/produits/modifier/:id",operationController.modifier)
router.put("/produits/:id",operationController.update)
router.delete("/produits/:id",operationController.delete)

router.get("/connect/:id",userController.connect)
router.get("/deconnection",userController.deconnection)

//ifreturn router;
//}
module.exports = router;
