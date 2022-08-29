var Sequelize = require('sequelize');
var sequelize;
const ProduitsModel=require("./produits");
const CategoriesModel=require("./categories");
const PanierProduitsModel=require("./panier_produits");
const PanierModel=require("./panier");
const UsersModel=require("./users");
const CommentaireModel=require("./commentaires");


//const sequelize=new Sequelize({dialect:"mysql"});
//db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"

if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    // sequelize = new Sequelize("vetement", "postgres", "password", {
    //   host:"localhost",
    //   port:"5432",
    //   dialect: 'postgres',
    //   protocol: 'postgres',
    //   logging: str=>      console.log(str)
    
    // })
    sequelize = new Sequelize(process.env.DATABASE_URL,{
      dialect:  'postgres',
      protocol: 'postgres',
      // disable logging; default: console.log
      logging: false
    
    });
    console.log("init postgres db")
  }else{
     sequelize = new Sequelize("mysql://root:root@localhost:3306/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
      console.log("init mysql db")
  }


  const produits=ProduitsModel(sequelize,Sequelize);
  const categories=CategoriesModel(sequelize,Sequelize);
  const commentaires=CommentaireModel(sequelize,Sequelize);
  const panier_produit=PanierProduitsModel(sequelize,Sequelize);
  const users=UsersModel(sequelize,Sequelize);
  const panier=PanierModel(sequelize,Sequelize);

  module.exports = {
    produits,
    categories,
    commentaires,
    panier_produit,
    panier,
    sequelize,
    users
  }
