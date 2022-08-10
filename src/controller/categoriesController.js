controller={}

const cat=require('../model/categories').categories;
var mysql = require('mysql2');
const {sequelize,Sequelize}=require("../model/onfig")
/**Affiche la page des categories
 * @method GET
 * @url /categories
 * @returns retourne la page avec la liste des categories
 * @version 1.0
 */
controller.liste=(req,res)=>{
cat.findAll().then((cats)=>{
/*req.session.user=user */ 
    res.render("categories",{cats:cats, user:req.signedCookies["user"]})
})
}
/**Ajoute une categorie
 * @param req requete utilisateur
 * @param res reponnse serveur
 */
controller.insert=(req,res)=>{
cat.findAll({limit:1,order:[["id","DESC"]]}).then((cats)=>{
    /*req.session.user=user */
    cat.create({id:cats[0].id+1,nom_categorie:req.body.categorie,etat:1}).then((cat)=>{
        /*req.session.user=user */
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
        /*req.session.user=user */
        res.redirect("/categories");
    })
}
/**Met a jour l'etat d'une categorie (acti/inactif) afin d'affiche ou de cacher les produits de la categorie
 * @method PUT
 * @url /categories/:id
 * @retourne la page avec la categorie modifié
 */
controller.updateetat=(req,res) =>{
    cat.update({
        etat:req.body.etat},
        {where:{id:req.params.id}}
    ).then(()=>{
        /*req.session.=user */
        res.redirect("/categories");
    })
}
/** Supprime une categorie
 * @method DELETE
 * @url /categories/:id
*/
controller.remove=(req,res)=>{
    cat.destroy({where:{id:req.params.id}}).then( ()=>{
        /*req.session.user=user */
       // res.redirect("/categories");
       res.sendStatus(200)
    })
}
module.exports=controller;