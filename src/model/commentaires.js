const {sequelize,Sequelize}=require("./config")

const commentaires = sequelize.define('commentaires', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        commentaire:Sequelize.STRING(30),
        date_commentaire:{type:Sequelize.DATE },
        userId:{field:"users_id",references:"users",type:Sequelize.INTEGER},
        produitId:{field:"produits_id",references:"produits",type:Sequelize.INTEGER},
},{tableName:"commentaires",timestamps:false});

var exports = module.exports = {};
exports.commentaires = commentaires;