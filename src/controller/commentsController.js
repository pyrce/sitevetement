controller={}
const users=require('../model/users').users;
const produits=require('../model/produits').produits;
var sql = require("mysql2");
var moment=require('moment');
const com=require("../model/commentaires").commentaires;
const {sequelize,Sequelize}=require("../model/onfig")
  users.hasMany(com);
  com.belongsTo(users);
/** Renvoie la liste des commentaires d'un produit
 * @method GET
 *@url /commentaires
*/
controller.liste=(req,res)=>{

  com.findAll({where:{produitId:req.query.id}, include:[{model:users}]}).then((coms)=>{
    /*req.session.user=user */
    res.send({coms:coms,moment:moment});
  })
}
/** Supprimer un commentaire
 * @method DELETE
 * @url /commentaires/:id
 */
controller.removeCom=(req,res) => {
  console.log(req.query.id)
  com.destroy({where:{id:req.params.id}}).then((com)=>{
    /*req.session.user=user */
    res.sendStatus(200)
  })
}
/** Ajoute un commentaire 
  * @method POST
  * @url /commentaires
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
 * @method PUT
 * @url /commentaires/:id 
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