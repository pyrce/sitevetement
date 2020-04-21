controller={}
const users=require('../model/users').users;
const produits=require('../model/produits').produits;
var Sequelize = require('sequelize');
var sql = require("mysql2");
var moment=require('moment');
const com=require("../model/commentaires").commentaires;
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
  users.hasMany(com);
  com.belongsTo(users);
/** Renvoie la liste des commentaires d'un produit
 * @param req requete utilisateur
 * @param res reponnse serveur
*/
controller.liste=(req,res)=>{

  com.findAll({where:{produitId:req.query.id}, include:[{model:users}]}).then((coms)=>{
    /*req.session.user=user */
    res.send({coms:coms,moment:moment});
  })
}
/** Supprimer un commentaire
 * @param req requete utilisateur
 * @param res reponnse serveur
 */
controller.removeCom=(req,res) => {
  console.log(req.query.id)
  com.destroy({where:{id:req.params.id}}).then((com)=>{
    /*req.session.user=user */
    res.sendStatus(200)
  })
}
/** Ajoute un commentaire 
  * @param req requete utilisateur
 * @param res reponnse serveur 
*/
controller.ajout=(req,res) => {
var usersid=req.body.userid;
var date=new Date();
com.create({
    produitId:req.body.produitid,
    commentaire:req.body.com,
    date_commentaire:date ,
    userId:req.body.userid
}).then( ()=>{
  /*req.session.user=user */

  res.sendStatus(200);
})
   

}
/** Met a jour un commentaire
 * @param req requete utilisateur
 * @param res reponnse serveur  
*/
controller.update=(req,res)=>{

  com.findOne({where:{id:req.params.id}}).then( (current_com)=>{
    /*req.session.user=user */
    current_com.update({
      commentaire:req.body.comment
    }).then(()=>{
      /*req.session.user=user */
      console.log("update reussi")
       res.redirect("/produits/"+req.body.id_prod)
  })

  })
}

module.exports = controller;