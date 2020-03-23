controller={}

const cat=require('../model/categories').categories;
var mysql = require('mysql2');
var Sequelize=require('sequelize')
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
/**Affiche la page des categories
 * @param req requete utilisateur
 * @param res reponnse serveur
 * @returns retourne la page avec la liste des categories
 * @version 1.0
 */
controller.liste=(req,res)=>{
cat.findAll().then((cats)=>{
    res.render("categories",{cats:cats, user:req.session.user})
})
}
/**Ajoute une categorie
 * @param req requete utilisateur
 * @param res reponnse serveur
 */
controller.insert=(req,res)=>{
cat.findAll({limit:1,order:[["id","DESC"]]}).then((cats)=>{

    cat.create({id:cats[0].id+1,nom_categorie:req.body.categorie,etat:1}).then((cat)=>{
        res.redirect("/categories")
    })
})
}
/**Met a jour une categorie
 * @param req requete utilisateur
 * @param res reponnse serveur
 * @retourne la page avec la categorie modifié
 */
controller.update=(req,res) =>{
    cat.update({
        nom_categorie:req.body.nom_cat},
        {where:{id:req.params.id}}
    ).then(()=>{
        res.redirect("/categories");
    })
}
/**Met a jour l'etat d'une categorie (acti/inactif) afin d'affiche ou de cacher les produits de la categorie
 * @param req requete utilisateur
 * @param res reponnse serveur
 * @retourne la page avec la categorie modifié
 */
controller.updateetat=(req,res) =>{
    cat.update({
        etat:req.body.etat},
        {where:{id:req.params.id}}
    ).then(()=>{
        res.redirect("/categories");
    })
}
/** Supprime une categorie
 * @param req requete utilisateur
 * @param res reponnse serveur
*/
controller.remove=(req,res)=>{
    cat.destroy({where:{id:req.params.id}}).then( ()=>{
       // res.redirect("/categories");
       res.sendStatus(200)
    })
}
module.exports=controller;