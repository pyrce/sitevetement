controller={}
const produitModel=require('../model/produits');
const cat=require('../model/categories').categories;
const panier=require('../model/panier').panier;
const panier_produit=require('../model/panier_produits').panier_produit;
const users=require('../model/users').users;
var produit=produitModel.produits;
var mysql = require('mysql2');
const {sequelize,Sequelize}=require("../model/config")
const seq = Sequelize.Op;
  panier.belongsTo(users);
  users.hasMany(panier);

  panier.belongsToMany(produit,{through:{model:panier_produit}})
  produit.belongsToMany(panier,{through:{model:panier_produit}})
/**Affiche la page du panier avec les produits de l'utilisateurs
  * @method GET
 * @url /panier
 */
controller.liste=(req,res) => {

  //réccupére tous les produits de panier de l'utilisateur
    panier.findAll({
      
      include:[
{model:produit}
    ],where:{users_id:req.signedCookies["user"].id}}).then((data)=>{
//fait le total des produits
some=0;
for(p of data){
  some+=p.prix_unitaire*p.quantite
}
 res.render("panier",{produit:data,some:some,user:  req.signedCookies["user"]});
} )

}
/**Ajout un produit au panier de l'utilisateur
  * @method POST
 * @url /panier/ajout
 */
controller.ajout=(req,res)=>{
var produitid=req.body.produitid;

produit.findOne({
  where: {
      id: { [seq.eq]:produitid
  }
}}).then((p)=>{ if(p.stock==0){ 

  res.send({"msg":"ko"});
}else{

  panier.create({
    userId:req.signedCookies["user"].id,
    quantite:req.body.quantite,
    prix_unitaire:req.body.prix   
}).then(()=>{

  panier.findAll({limit:1,order:[["id","DESC"]]}).then(current=>{
//crér dans panier_produit pour faire les lien avec la table produit
    panier_produit.create(
      {
        panierId:current[0].id,
        produitId:produitid
      }
    ).then(result =>{
      res.send({"msg":"ok"});
    }).catch(function(err) {
      // print the error details
      console.log(err);
  });
  })
} )
}
})
/*.catch(function(err) {
  // print the error details
  console.log(err);
});*/
}
/**Modifie la quantité du produit dans la panier de l'utilisateur 
  * @method PUT
 * @url /panier/:id
 */
controller.update=(req,res) => {
  panier.update({quantite:req.body.qte},{
    where:{users_id:req.body.userid,id:req.params.id}
  }).then(()=>{
    /*req.session.user=user */
    res.sendStatus(200)
  })
}
/**Supprime un produit dans le panier de l'utilisateur
 * @method DELETE
 * @url /panier/:id
 */
controller.delete=(req,res) => {
  panier_produit.destroy({where:{panier_id:req.params.id}}).then(()=>{
    /*req.session.user=user */

    panier.destroy({where:{id:req.params.id,userId:req.body.userid}}).then(()=>{
      /*req.session.user=user */
    res.sendStatus(200);
    })
  })
}
module.exports=controller;