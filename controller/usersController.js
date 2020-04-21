controller={}
const users=require('../model/users').users;
var Sequelize = require('sequelize');
var sequelize;
//db=(typeof process.env.DB_DATABASE!="undefined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
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

/*   controller.login=(req,res) => {
      users.findOne({email:req.body.email,password:req.body.password}).then((user) => {
          req.session.user=user
          res.redirect("/")
      })
  } */


/*   controller.login=(req, res, email, password, callback) => {

    
      const mysql = require('mysql2');
      const bcrypt = require('bcrypt');
    
      const connection = mysql({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'vetement'
      });
    
      connection.connect();
    
      const query = 'SELECT email, password FROM users WHERE email = ?';
    
      connection.query(query, [ email ], function(err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
        const user = results[0];
    
        bcrypt.compare(password, user.password, function(err, isValid) {
          if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
    
          callback(null, {
            user_id: user.id.toString(),
            nickname: user.nickname,
            email: user.email
          });
        });
      });
    
    
    } */

  controller.connect=(req,res) => {

    users.findOne({where:{id: req.params.id}}).then((user) => {
     // console.log(user)
      req.session.user=user
      res.redirect("/");
    })

  }

  controller.deconnection=(req,res) => {
    req.session.user=false;
    res.redirect("/");
  }
  module.exports=controller;