controller = {}
const produitsModel = require('../model/produits');
const com = require("../model/commentaires").commentaires;

const users = require("../model/users").users;
const moment = require("moment")
var Sequelize = require('sequelize');
const seq = Sequelize.Op;
var passport = require('passport');
var sql = require("mysql2");
const cat = require("../model/categories").categories;
var produits = produitsModel.produits;
var sequelize;
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres'
    })
} else {
    sequelize = new Sequelize("mysql://root:root@localhost:8889/vetement", {
        dialect: 'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: true,
        logging: console.log

    });
}
users.hasMany(com);
com.belongsTo(users);
moment.locale('fr');
cat.hasMany(produits);
produits.belongsTo(cat);



/**Affiche la page avec la liste des produits et une zone de recherche par prix et categories.
 * Affichage des produits par un systeme de pagination.
  * @param req requete utilisateur
 * @param res reponnse serveur 
 */
controller.liste = (req, res) => {
    if (typeof req.session.user == "undefined")
        req.session.user = {
            id: 1,
            nom_client: "tom"
        }
    //if(typeof req.session.user!="undefined"){
    const pageSize = 10;
    //console.log( req.session.user)
    var page = (typeof req.params.page != "undefined" && req.params.page > 0) ? req.params.page : 0
    var offset = parseInt(page) * pageSize;// calcul le nombre de ligne ignoré
    const limit = pageSize;
    var catid = typeof req.body.cat_id != "undefined" ? req.body.cat_id : ''

    produits.findAll({
       include: [{
                model: cat,where:{etat:1}//ne liste que les produits actifs
            }]
        }, {
            limit,
            offset
        })
        .then((data) => {
            produits.findAll().then(all => {

                cat.findAll().then((cats) => {//listes des categorie pour la rechrerche

                    res.render("accueil", {
                        product: data,
                        total: all.length,
                        cats: cats,
                        user: req.session.user
                    });
                })

            })

        })
    //}else {res.redirect("/login")}
}
/** Lors qu'on effectue une recherche , on retourne la liste des produits correspondant aux critères
  * @param req requete utilisateur
 * @param res reponnse serveur 
 * @return retourne la liste des produits
 * @version 1.0
 */
controller.listeproduits = (req, res) => {
    const pageSize = 10;

    var page = (typeof req.params.page != "undefined" && req.params.page > 0) ? req.params.page : 0
    var offset = parseInt(page) * pageSize;
    const limit = pageSize;


    var cat_id = req.body.cat_id != '' ? req.body.cat_id : null

    var wherestmt = {}
    var prices = []
    //verifie si on recupere le champ cat_id
    if (req.body.cat_id != '') {
        wherestmt["categories_id"] = {}
        wherestmt["categories_id"] = {
            [seq.eq]: cat_id
        }
    }
    wherestmt["prix_unitaire"] = {}
    if (Number(req.body.prixmin) > 0) {


        prices.push(req.body.prixmin)
    } else {
        prices.push(0)

    }
//si pn entre unnn prix max, met dans le talbeau
    if (Number(req.body.prixmax) > 0) {
        prices.push(req.body.prixmax)
    }

//si le tableau contient 1 élément on cherche tous les prodduits dont le prix est supperieur
//sinon on cherche ce qui sont compris entre
    wherestmt["prix_unitaire"] = prices.length > 1 ? {
        [seq.between]: prices
    } : {
        [seq.gte]: prices[0]
    }
//console.log(wherestmt);
    produits.findAll({
            where: wherestmt

        }, {
            limit,
            offset
        },
        )
        .then((data) => {
           //  console.log(data[0])

            res.send(data);


        })
}
/**Réccupère l'id du produit dans l'url et retourne la page d'infos du produits.
  * @param req requete utilisateur
 * @param res reponnse serveur 
 * @version 1.0
 */
controller.detail = (req, res) => {
    if (typeof req.session.user == "undefined"){
    req.session.user = {
        id: 1,
        nom_client: "tom"
    }

}
    produits.findOne({
        where: {
            id: { [seq.eq]:req.params.id}
        }
    }).then((produit) => {
console.log(req.params.id)
        com.findAll({include:[{model:users}]},{
          where:{
                produitId:{[seq.eq]:req.params.id}
            } }).then((coms) => {
            // res.send(coms)
            users.findOne({
             where:{ id: {[seq.eq]:req.session.user.id}}
            }).then(user => {
                res.render("detail", {
                    produit: produit,
                    coms: coms,
                    moment: moment,
                    user: user
                });
            })
        })



    })

}

controller.ajout = (req, res) => {
    cat.findAll().then((cats) => {

        res.render("ajout", {
            cat: cats
        });
    })

}
/**Ajoute un produit 
 * 
 */
controller.add = (req, res) => {
    produits.create({
        nom_produit: req.body.nomproduit,
        designation: req.body.designation,
        image_produit: req.body.image,
        stock: req.body.stock,
        prix_unitaire: req.body.prix,
        categories_id: req.body.categorie
    }).then(() => {
        res.redirect("/");
    })
}
controller.modifier = (req, res) => {
    produits.findOne({
        id: req.params.id
    }).then((data) => {
        cat.findAll().then((cats) => {
            res.render("modifier", {
                produit: data,
                cat: cats
            });
        })

    })

}
controller.update = (req, res) => {
    console.log(req.body)
    produits.findOne({
        id: req.params.id
    }).then((produit) => {

        produit.update({
            nom_produit: req.body.nom,
            designation: req.body.designation,
            image_produit: req.body.image,
            stock: req.body.stock,
            prix_unitaire: req.body.prix,
            categories_id: req.body.categorie_id
        }).then(() => {
            console.log("update reussi")
            return res.sendStatus(200)
        })




    })
}
controller.delete = (req, res) => {

    produits.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect("/");
    })
}
module.exports = controller;