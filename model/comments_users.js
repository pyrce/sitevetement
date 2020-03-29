var Sequelize = require('sequelize');
var sequelize;
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
const comment_user = sequelize.define('comments_users', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    commentaireId:{field:"commentaire_id",references:"commentaires",type:Sequelize.INTEGER},
        userId:{field:"users_id",references:"users",type:Sequelize.INTEGER},
},{tableName:"comments_users",timestamps: false});

var exports = module.exports = {};
exports.comment_user = comment_user;