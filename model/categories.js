var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{

    // disable logging; default: console.log
    logging: false
  
  });
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