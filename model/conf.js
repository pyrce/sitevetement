var Sequelize = require('sequelize');
//const sequelize=new Sequelize({dialect:"mysql"});
db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_DATABASE+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:@localhost:3306/vetement"
const sequelize = new Sequelize(db,{

    // disable logging; default: console.log
    logging: false
  
  });
