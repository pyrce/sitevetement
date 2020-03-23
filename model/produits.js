var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
//var db=(typeof process.env.DB_DATABASE!="undefined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"

var sequelize="";
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres'
    })
  }else{
     sequelize = new Sequelize("mysql://root:root@localhost:8889/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
  }
const produits = sequelize.define('produits', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
        nom_produit:Sequelize.STRING(30),
        designation:Sequelize.STRING(30),
        prix_unitaire:Sequelize.FLOAT,
        stock:Sequelize.INTEGER,
        description:Sequelize.STRING(30),
        image_produit:Sequelize.STRING(30),
        categoryId:{field:"categories_id",type:Sequelize.INTEGER,references:"categories"}
    
},{timestamps: false});

var exports = module.exports = {};
exports.produits = produits;