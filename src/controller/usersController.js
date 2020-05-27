controller={}
const users=require('../model/users').users;
var Sequelize=require('sequelize')
var bcrypt = require('bcrypt');
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

  controller.connect=(req,res) => {
    console.log("connexion")
      res.render("login");
  } 

  /**  verifie si c'est le bon utilisateur
    * @method POST
    * @url /login
   */
  controller.login= (req,res) => {

    users.findOne({where:{email: req.body.email}  }).then(async (user) => {

      //compare le hashh du mot de pass entré avec celui dans la base de donées
      const match = await bcrypt.compare(req.body.password, user.password);

if(match){
    res.cookie('user', user, { maxAge: 1000*60*60, httpOnly: true ,signed:true});
    res.send({"msg":"ok"});
}else{
  res.send({"msg":"ko"});
}
    
      
      }).catch((err)=>{
        res.send({"msg":"ko"});
      });

  }

  controller.deconnection=(req,res) => {
    console.log("ddeconnection");
    res.clearCookie('user');
       res.redirect("/");
  }
  module.exports=controller;