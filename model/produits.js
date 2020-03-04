var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');
const produits = sequelize.define('produits', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_produit:Sequelize.STRING(30),
        designation:Sequelize.STRING(30),
        prix_unitaire:Sequelize.FLOAT,
        stock:Sequelize.INTEGER,
        image_produit:Sequelize.STRING(30),
        categories_id:Sequelize.INTEGER
    
},{tablName:"produits", timestamps: false});

var exports = module.exports = {};
exports.produits = produits;