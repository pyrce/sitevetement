controller = {}
const produits = require('../model/produits').produits;

const com = require("../model/commentaires").commentaires;

const users = require("../model/users").users;
const moment = require("moment")
var Sequelize = require('sequelize');
const seq = Sequelize.Op;
var passport = require('passport');
var sql = require("mysql2");
const cat = require("../model/categories").categories;

var sequelize;
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres'
    })
} else {
    sequelize = new Sequelize("mysql://root:@localhost:3306/vetement", {
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
cat.hasMany(produits,{foreignKey: produits.categoryId});
produits.belongsTo(cat,{foreignKey: produits.categoryId});



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
    const pageSize = 5;

    var page = (typeof req.params.page != "undefined" || parseInt(req.params.page)>0 ) ? parseInt(req.params.page) : 1
    var offset = Math.abs((1-parseInt(page))) * pageSize;// calcul le nombre de ligne ignoré
   
console.log(offset)
  /*  produits.findAll( {
       
       include: [{
                model: cat,where:{ etat:{[seq.eq]:1} },//ne liste que les produits actifs
               
            }]
            
        },{limit:limit,offset:offset})*/
        sequelize.query("SELECT * from produits p "+
       " join categories c on p.categories_id=c.id where c.etat=1 order by p.id asc limit :start offset :end ",
        {replacements:{ start: pageSize,end:offset }})
        .then((data) => { 
//res.send(data[ Math.abs((1-parseInt(page))) ])
console.log(data.length)
                cat.findAll({ where:{ etat:{[seq.eq]:1} } }).then((cats) => {//listes des categorie pour la rechrerche

                    res.render("accueil", {
                        product: data[ Math.abs((1-parseInt(page))) ],
                        total: data.length,
                        pages:pageSize,
                        cats: cats,
                        user: req.session.user
                    });
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
<<<<<<< HEAD
    if (typeof req.session.user == "undefined"){
        req.session.user = {
            id: 1,
            nom_client: "tom"
        }
    
    }
    const pageSize = 10;
=======
>>>>>>> d268b8f19937921145ab2a35c32c95ec6022bb41

    if (typeof req.session.user == "undefined"){
        req.session.user = {
            id: 1,
            nom_client: "tom"
        }
    
    }

    const pageSize = 12;
    
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
    if (req.body.cat_id != '') {
        wherestmt["categories_id"] = {}
        wherestmt["categories_id"] = {
            [seq.eq]: cat_id
        }
    }
    console.log(wherestmt)
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

<<<<<<< HEAD
    produits.findAll( {
            where: wherestmt

        },
        )
=======

//console.log(wherestmt);
    produits.findAll(   {
     
       
            where: wherestmt

        }
    )

>>>>>>> d268b8f19937921145ab2a35c32c95ec6022bb41
        .then((data) => {
            /*req.session.user=user */
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
        /*req.session.user=user */
console.log(req.params.id)
        com.findAll({include:[{model:users}]},{
          where:{
                produitId:{[seq.eq]:req.params.id}
            } }).then((coms) => {
                /*req.session.user=user */
            // res.send(coms)
            users.findOne({
             where:{ id: {[seq.eq]:req.session.user.id}}
            }).then(user => {
                /*req.session.user=user */
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
<<<<<<< HEAD
    cat.findAll({ where:{ etat:{[seq.eq]:1} } }).then((cats) => {

=======
    cat.findAll().then((cats) => {
        /*req.session.user=user */
>>>>>>> d268b8f19937921145ab2a35c32c95ec6022bb41
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


controller.modifier = (req, res) => {
    produits.findOne({
        where:{
<<<<<<< HEAD
              id:{[seq.eq]:req.params.id}
          } }).then((data) => {
=======
            id:{[seq.eq]:req.params.id}
        }
    }).then((data) => {
        /*req.session.user=user */
>>>>>>> d268b8f19937921145ab2a35c32c95ec6022bb41
        cat.findAll().then((cats) => {
            /*req.session.user=user */
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
        where:{
<<<<<<< HEAD
              id:{[seq.eq]:req.params.id}
          } }).then((produit) => {
=======
            id:{[seq.eq]:req.params.id}
        }
    }).then((produit) => {
        /*req.session.user=user */
>>>>>>> d268b8f19937921145ab2a35c32c95ec6022bb41

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
controller.delete = (req, res) => {

    produits.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        /*req.session.user=user */
        /* res.redirect("/"); */
        res.json({etat:1});
        //renvoyer info au front ?
    })
}



controller.gerer = (req, res) => {


    cat.findAll().then((cats) => {
        /*req.session.user=user */
    produits.findAll({include:[{model:cat}]}).then((produits) => {
        /*req.session.user=user */

    res.render("gerer", {
        prod: produits, cat:cats, user: req.session.user

    });

})

 })
}



module.exports = controller;