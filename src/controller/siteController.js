controller = {}
const produits = require('../model/produits').produits;


var bcrypt = require('bcrypt');
const com = require("../model/commentaires").commentaires;
var jwt = require('jsonwebtoken');
const users = require("../model/users").users;
var cookieParser = require('cookie-parser');
const moment = require("moment")
const {sequelize,Sequelize}=require("../model/config")
const seq = Sequelize.Op;
//var passport = require('passport');
var sql = require("mysql2");
const cat = require("../model/categories").categories;

users.hasMany(com);
com.belongsTo(users);
moment.locale('fr');
cat.hasMany(produits, {
    foreignKey: produits.categoryId
});
produits.belongsTo(cat, {
    foreignKey: produits.categoryId
});



/**Affiche la page avec la liste des produits et une zone de recherche par prix et categories.
 * Affichage des produits par un systeme de pagination.
 * @method GET
 * @url /
 */
controller.liste = (req, res) => {
   /* bcrypt.hash("pass", 1, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
        users.update(
          { password: hash },
          {where:{id:2}}
        )
        users.update(
            { password: hash },
            {where:{id:1}}
          )
})*/
    console.time("liste-article")
    
    var offset=0;
    const pageSize = 5;
    var page = (typeof req.params.page != "undefined" || parseInt(req.params.page) > 0) ? parseInt(req.params.page) : 1
    if(!isNaN(page))
    offset = Math.abs((1 - parseInt(page))) * pageSize; // calcul le nombre de ligne ignoré

      produits.findAll( {
         
         include: [{
                  model: cat,where:{ etat:{[seq.eq]:1} },//ne liste que les produits actifs
                 
              }],
              limit:pageSize,offset:offset,order:[ ["id","ASC"]]
          },{})
        .then((data) => {
        
            cat.findAll({
                where: {
                    etat: {
                        [seq.eq]: 1
                    }
                }
            }).then((cats) => { //listes des categorie pour la rechrerche
produits.findAll({}).then(allproduits=>{
    console.timeEnd("liste-article")

                res.render("accueil", {
                    product: data,
                    total: allproduits.length/pageSize,
                    pages: pageSize,
                    cats: cats,
                    user: req.signedCookies["user"]
                });
})

            })



        })

}
/** Lors qu'on effectue une recherche , on retourne la liste des produits correspondant aux critères
 * @method GET
 * @url /
 * @return retourne la liste des produits
 * @version 1.0
 */
controller.listeproduits = (req, res) => {

    

        const pageSize = 5;

        /* var page = (typeof req.params.page != "undefined" || parseInt(req.params.page)>0 ) ? req.params.page : 0
        var offset = Math.abs((1-parseInt(page))) * pageSize;// calcul le nombre de ligne ignoré
        const limit = pageSize; */
        var page = (typeof req.params.page != "undefined" && req.params.page > 0) ? req.params.page : 0
        var offset = parseInt(page) * pageSize;
        const limit = pageSize;

        var cat_id = req.body.cat_id != '' ? req.body.cat_id : null
        console.log("debut")
        var wherestmt = {}
        var prices = []
      
        //verifie si on recupere le champ cat_id
       /* if (cat_id != '') {
            wherestmt["categories_id"] = {}
            wherestmt["categories_id"] = {
                [seq.eq]: parseInt(cat_id)
            }
        }*/

console.log(typeof cat_id);
       
        wherestmt["prix_unitaire"] = {}
        if (Number(req.body.prixmin) > 0) {


            prices.push(req.body.prixmin)
        } else {
            prices.push(0)

        }
        //si pn entre unnn prix max, met dans le talbeau
        if (Number(req.body.prixmax) > 0) {
           
            prices.push(Number(req.body.prixmax))
        }

        //si le tableau contient 1 élément on cherche tous les prodduits dont le prix est supperieur
        //sinon on cherche ce qui sont compris entre
        wherestmt["prix_unitaire"] = prices.length > 1 ? {
            [seq.between]: prices
        } : {
            [seq.gte]: prices[0]
        }

        produits.findAll({
         
            include: [{
                     model: cat,//ne liste que les produits actifs
                    where:{id:cat_id}
                 }]
                 
             },{
                where: wherestmt,
            
            })
            .then((data) => {
                /*req.session.user=user */
                //  console.log(data[0])

                res.send(data);


            })
    

}

/**Réccupère l'id du produit dans l'url et retourne la page d'infos du produits.
 * @method GET
 * @url /produits/:id
 * @version 1.0
 */
controller.detail = (req, res) => {

    produits.findOne({
        where: {
            id: {
                [seq.eq]: req.params.id
            }
        }
    }).then((produit) => {
        /*req.session.user=user */
        console.log(req.params.id)
        com.findAll({
            include: [{
                model: users
            }]
        }, {
            where: {
                produitId: {
                    [seq.eq]: req.params.id
                }
            }
        }).then((coms) => {
            /*req.session.user=user */
            // res.send(coms)
       
                /*req.session.user=user */
                res.render("detail", {
                    produit: produit,
                    coms: coms,
                    moment: moment,
                    user: req.signedCookies["user"]
                });
            
        })

    })

}
/**affiche la page ajout de produits
 * @method GET
 * @url /produits/ajout 
 */
controller.ajout = (req, res) => {
    cat.findAll({
        where: {
            etat: {
                [seq.eq]: 1
            }
        }
    }).then((cats) => {

        res.render("ajout", {
            cat: cats
        });
    })

}
/**Ajoute un produit 
 * @method Post
 * @url /produits/:id 
 */
controller.add = (req, res) => {
    produits.create({
        nom_produit: req.body.nomproduit,
        designation: req.body.designation,
        description: req.body.description,
        image_produit: req.body.image,
        stock: req.body.stock,
        prix_unitaire: req.body.prix,
        categoryId: req.body.categorie
    }).then(() => {
        /*req.session.user=user */
        res.redirect("/produits/gerer");
    })
}

/**page de modification d'un produits
 * @url /produits/modifier/:id
 * @method GET
 */
controller.modifier = (req, res) => {
    produits.findOne({
        where: {
            id: {
                [seq.eq]: req.params.id
            }
        }
    }).then((data) => {
        cat.findAll().then((cats) => {
            /*req.session.user=user */
            res.render("modifier", {
                produit: data,
                cat: cats
            });
        })

    })

}

/**Modification du proudit
 * @method PUT
 * @url /produits/:id
 */
controller.update = (req, res) => {
    console.log(req.body)
    produits.findOne({
        where: {
            id: {
                [seq.eq]: req.params.id
            }
        }
    }).then((produit) => {

        produit.update({
            nom_produit: req.body.nom,
            designation: req.body.designation,
            description: req.body.description,
            image_produit: req.body.image,
            stock: req.body.stock,
            prix_unitaire: req.body.prix,
            categories_id: req.body.categorie_id
        }).then(() => {
            /*req.session.user=user */
            res.redirect("/produits/gerer");
        })




    })
}

/**
 * Suppresion d'un produit
 * @method DELETE
 * @url /produits/:id
 */
controller.delete = (req, res) => {

    produits.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        /*req.session.user=user */
        /* res.redirect("/"); */
        res.json({
            etat: 1
        });
        //renvoyer info au front ?
    })
}


/**Page de gestion des produits
 * @method GET
 * @url /produits/gerer
 */
controller.gerer = (req, res) => {

if(typeof req.signedCookies["user"]!="undefined"){
    cat.findAll().then((cats) => {
        /*req.session.user=user */
        produits.findAll({
            include: [{
                model: cat
            }]
        }).then((produits) => {
            /*req.session.user=user */

            res.render("gerer", {
                prod: produits,
                cat: cats,
                user:req.signedCookies["user"]

            });

        })

    })}else{res.redirect("/")}
}



module.exports = controller;