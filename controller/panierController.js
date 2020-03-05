controller={}
const produitModel=require('../model/produits');
const cat=require('../model/categories').categories;
const panier=require('../model/panier').panier;
const panier_produit=require('../model/panier_produits').panier_produit;
const users=require('../model/users').users;
var produit=produitModel.produits;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{

    // disable logging; default: console.log
    logging: false
  
  });
  panier.belongsTo(users);
  users.hasMany(panier);

  panier.belongsToMany(produit,{through:{model:panier_produit}})
  produit.belongsToMany(panier,{through:{model:panier_produit}})

controller.liste=(req,res) => {
    panier.findAll({
      
      include:[
{model:produit}
    ],where:{"users_id":1}}).then((data)=>{
//res.send(data)
 res.render("panier",{produit:data});
} )
    
}


module.exports=controller;