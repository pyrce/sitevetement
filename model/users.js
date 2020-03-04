var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
const sequelize = new Sequelize('mysql://root:root@localhost:8889/vetement');
const users = sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_user:String,
        prenom_user:String,
        adresse_livraison:String,
        adresse:String,
        password:String,
        email:String,
        role:String,
});

var exports = module.exports = {};
exports.users = users;