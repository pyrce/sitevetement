controller={}
const opModel=require('../model/produits');
var op=opModel.produits;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');

controller.liste=(req,res)=>{

    op.findAll()
.then((data)=>{

    res.render("accueil",{product:data});
})

}

controller.ajout=(req,res)=>{
    res.render("ajout");
}

module.exports=controller;