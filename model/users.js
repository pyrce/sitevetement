var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement',{

    // disable logging; default: console.log
    logging: false
  
  });
const users = sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_client:Sequelize.STRING(30),
        prenom_client:{type:Sequelize.STRING(30),field:"prenom_client" },
        adresse_livraison:Sequelize.STRING(30),
        adresse:Sequelize.STRING(30),
        password:Sequelize.STRING(30),
        email:Sequelize.STRING(30),
        role:Sequelize.STRING(30),
},{timestamps:false});

var exports = module.exports = {};
exports.users = users;