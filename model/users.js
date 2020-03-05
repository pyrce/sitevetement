var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
//db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
var sequelize;
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres'
    })
  }else{
     sequelize = new Sequelize("mysql://root:root@localhost:3306/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
  }
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