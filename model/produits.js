var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{

    // disable logging; default: console.log
    logging: false
  
  });
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
        description:Sequelize.STRING(30),
        image_produit:Sequelize.STRING(30),
        categories_id:Sequelize.INTEGER
    
},{timestamps: false});

var exports = module.exports = {};
exports.produits = produits;