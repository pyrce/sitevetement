const {sequelize,Sequelize}=require("./config")
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