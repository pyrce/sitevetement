var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');
const panier_produit = sequelize.define('panier_produit', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        produit_id:Number,
        user_id:Number,
});

var exports = module.exports = {};
exports.panier_produit = panier_produit;