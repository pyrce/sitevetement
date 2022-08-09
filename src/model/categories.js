const {sequelize,Sequelize}=require("./config")
const categories = sequelize.define('categories', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_categorie:Sequelize.STRING(30),
        etat:Sequelize.INTEGER,
},{tablName:"categories", timestamps: false});

var exports = module.exports = {};
exports.categories = categories;