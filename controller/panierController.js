controller={}
const produitModel=require('../model/produits');
const cat=require('../model/categories').categories;
const panier=require('../model/panier').panier;
const panier_produit=require('../model/panier_produits').panier_produit;
const users=require('../model/users').users;
var produit=produitModel.produits;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
//db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
var sequelize;
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres'
    })
  }else{
     sequelize = new Sequelize("mysql://root:root@localhost:3306/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
  }
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