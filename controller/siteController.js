controller={}
const opModel=require('../model/produits');
var op=opModel.produits;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');

controller.liste=(req,res)=>{
console.log("listes produits")
    op.findAll()
.then((data)=>{
    console.log(data)
    res.render("accueil",{product:data});
})

}

module.exports=controller;