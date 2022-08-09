const {sequelize,Sequelize}=require("./config")
const panier_produit = sequelize.define('panier_produit', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        produitId:{field:"produits_id",references:"produits",type:Sequelize.INTEGER},
        panierId:{field:"panier_id",references:"panier",type:Sequelize.INTEGER},
},{tableName:"panier_produits",timestamps: false});

var exports = module.exports = {};
exports.panier_produit = panier_produit;