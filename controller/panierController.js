controller={}
const produitModel=require('../model/produits');
const cat=require('../model/categories').categories;
const panier=require('../model/panier').panier;
const panier_produit=require('../model/panier_produits').panier_produit;
const users=require('../model/users').users;
var produit=produitModel.produits;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
//db=(typeof process.env.DB_DATABASE!="undfined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
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
  panier.belongsTo(users);
  users.hasMany(panier);

  panier.belongsToMany(produit,{through:{model:panier_produit}})
  produit.belongsToMany(panier,{through:{model:panier_produit}})
/**Affichr la page du panier avec les produits de l'utilisateurs
  * @param req requete utilisateur
 * @param res reponnse serveur 
 */
controller.liste=(req,res) => {
  if (typeof req.session.user == "undefined"){
    req.session.user = {
        id: 1,
        nom_client: "tom"
    }
if(req.session.user){
    panier.findAll({
      
      include:[
{model:produit}
    ],where:{users_id:req.session.user.id}}).then((data)=>{
//res.send(data)
some=0;
for(p of data){
  some+=p.prix_unitaire*p.quantite
}
 res.render("panier",{produit:data,some:some,user:req.session.user});
} )
}else{res.redirect("/")}
}
/**Ajout un produit au panier de l'utilisateur
  * @param req requete utilisateur
 * @param res reponnse serveur 
 */
controller.ajout=(req,res)=>{
var produitid=req.body.produitid;
  panier.create({
    userId:req.body.userid,
    quantite:req.body.quantite,
    prix_unitaire:req.body.prix   
}).then(()=>{

  panier.findAll({limit:1,order:[["id","DESC"]]}).then(current=>{

    panier_produit.create(
      {
        panierId:current[0].id,
        produitId:produitid
      }
    ).then(result =>{
      res.sendStatus(200);
    }).catch(function(err) {
      // print the error details
      console.log(err);
  });
  })

}).catch(function(err) {
  // print the error details
  console.log(err);
});
}
/**Modifie la quantité du produit dans la panier de l'utilisateur 
  * @param req requete utilisateur. Contient id utilisateur et id pannier envoyer en ajax
 * @param res reponnse serveur 
 */
controller.update=(req,res) => {
  panier.update({quantite:req.body.qte},{
    where:{users_id:req.body.userid,id:req.params.id}
  }).then(()=>{
    res.sendStatus(200)
  })
}
/**Supprime un produit dans le panier de l'utilisateur
 * @param req requete utilisateur
 * @param res reponnse serveur  
 * 
 */
controller.delete=(req,res) => {
  panier_produit.destroy({where:{panier_id:req.params.id}}).then(()=>{

    panier.destroy({where:{id:req.params.id,userId:req.body.userid}}).then(()=>{
    res.sendStatus(200);
    })
  })
}
module.exports=controller;