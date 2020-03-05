var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{logging:false});
const panier = sequelize.define('panier', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        quantite:Sequelize.INTEGER,
        prix_unitaire:Sequelize.FLOAT,
        userId:{field:"users_id",references:"users",type: Sequelize.INTEGER}
},{tableName:"panier",timestamps: false});

var exports = module.exports = {};
exports.panier = panier;