
const {produits,categories}=require("./database");

const Sequelize= require("Sequelize");
const seq = Sequelize.Op;


// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });


produits.findAll( {
         
    include: [{
             model: categories,where:{ etat:{[seq.eq]:1} },//ne liste que les produits actifs
         
         }],
         limit:5,offset:0,order:[ ["id","ASC"]],
   
     })
   .then((data) => {   
        console.timeEnd("liste-article")
       console.log("fin liste article")
       categories.findAll({
           where: {
               etat: {
                   [seq.eq]: 1
               }
           }
       }).then((cats) => { //listes des categorie pour la rechrerche
           console.log("categorie")
produits.findAll({}).then(allproduits=>{

console.log("allproduits")
console.log(allproduits)
})

       }) 


   })