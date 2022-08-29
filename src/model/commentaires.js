
module.exports = (sequelize, DataTypes) => {
return sequelize.define('commentaires', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        commentaire:DataTypes.STRING(30),
        date_commentaire:{type:DataTypes.DATE },
        userId:{field:"users_id",references:"users",type:DataTypes.INTEGER},
        produitId:{field:"produits_id",references:"produits",type:DataTypes.INTEGER},
},{tableName:"commentaires",freezeTableName:true,timestamps:false});
}