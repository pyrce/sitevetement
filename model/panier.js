var Sequelize = require('sequelize');
var sequelize;
//const sequelize=new Sequelize({dialect:"mysql"});
//db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
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
const panier = sequelize.define('panier', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        quantite:Sequelize.INTEGER,
        prix_unitaire:Sequelize.FLOAT,
        userId:{field:"users_id",references:"users",type: Sequelize.INTEGER}
},{tableName:"panier",timestamps: false});

var exports = module.exports = {};
exports.panier = panier;