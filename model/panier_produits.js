var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{

    // disable logging; default: console.log
    logging: false
  
  });
const panier_produit = sequelize.define('panier_produit', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        produitId:{field:"produits_id",references:"produits",type:Sequelize.INTEGER},
        panierId:{field:"panier_id",references:"panier",type:Sequelize.INTEGER},
},{tableName:"panier_produit",timestamps: false});

var exports = module.exports = {};
exports.panier_produit = panier_produit;