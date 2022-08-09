const {sequelize,Sequelize}=require("./config")
const produits = sequelize.define('produits', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
        nom_produit:Sequelize.STRING(30),
        designation:Sequelize.STRING(30),
        prix_unitaire:Sequelize.FLOAT(),
        stock:Sequelize.INTEGER(),
        description:Sequelize.STRING(30),
        image_produit:Sequelize.STRING(30),
        categoryId:{field:"categories_id",type:Sequelize.INTEGER,references:"categories"}
    
},{timestamps: false});

var exports = module.exports = {};
exports.produits = produits;