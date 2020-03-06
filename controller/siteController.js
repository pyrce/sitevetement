controller={}
const opModel=require('../model/produits');
var Sequelize = require('sequelize');
var sql = require("mysql2");
const cat=require("../model/categories").categories;
var op=opModel.produits;
var sequelize;
//db=(typeof process.env.DB_DATABASE!="undefined") ? process.env.DB_CONNECTION+"://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_DATABASE :"mysql://root:root@localhost:3306/vetement"
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres'
    })
  }else{
     sequelize = new Sequelize("mysql://root:root@localhost:3306/vetement",{
        dialect:  'mysql',
        protocol: 'mysql',
        // disable logging; default: console.log
        logging: false
      
      });
  }

controller.liste=(req,res)=>{
    const pageSize=10;
    var page= (typeof req.params.page!="undefined") ? req.params.page:0
    const offset = parseInt(page) * pageSize;
    const limit = pageSize;
    op.findAll({  limit,
        offset})
.then((data)=>{
op.findAll().then( all=>{
    res.render("accueil",{product:data,total:all.length});
})
    
})

}
controller.detail=(req,res)=>{
op.findOne({id:req.params.id}).then((produit)=>{
res.render("detail",{produit:prodduit});
})

}

controller.ajout=(req,res)=>{
    cat.findAll().then((cats)=>{
  
        res.render("ajout",{cat:cats});  
    })
  
}

controller.add=(req,res)=>{
    op.create({
        nom_produit:req.body.nomproduit,
        designation:req.body.designation,
        image_produit:req.body.image,
        stock:req.body.stock,
        prix_unitaire:req.body.prix,
        categories_id:req.body.categorie     
    }).then( ()=>{
        res.redirect("/");
    })
}
controller.modifier=(req,res)=>{
    op.findOne({id:req.params.id}).then((data)=>{
        cat.findAll().then((cats)=>{
res.render("modifier",{produit:data,cat:cats});
        })

    })
    
}
controller.update=(req,res)=>{
   console.log(req.body)
    op.findOne({id:req.params.id}).then((produit)=>{

produit.update({
    nom_produit:req.body.nom,
    designation:req.body.designation,
    image_produit:req.body.image,
    stock:req.body.stock,
    prix_unitaire:req.body.prix,
    categories_id:req.body.categorie_id 
}).then(()=>{
    console.log("update reussi")
    return res.sendStatus(200)
})


        
        
    })
}
controller.delete=(req,res)=>{

    op.destroy({where:{id:req.params.id}}).then( ()=>{
        res.redirect("/");
    })
}
module.exports=controller;