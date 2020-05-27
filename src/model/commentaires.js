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
     sequelize = new Sequelize("mysql://root:@localhost:3306/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
  }
const commentaires = sequelize.define('commentaires', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        commentaire:Sequelize.STRING(30),
        date_commentaire:{type:Sequelize.DATE },
        userId:{field:"users_id",references:"users",type:Sequelize.INTEGER},
        produitId:{field:"produits_id",references:"produits",type:Sequelize.INTEGER},
},{tableName:"commentaires",timestamps:false});

var exports = module.exports = {};
exports.commentaires = commentaires;