var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');
const categories = sequelize.define('categories', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_categorie:String,
        etat:Number,
});

var exports = module.exports = {};
exports.categories = categories;