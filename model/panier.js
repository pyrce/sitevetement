var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');
const panier = sequelize.define('panier', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        quantite:String,
        prix_unitaire:String,
});

var exports = module.exports = {};
exports.panier = panier;