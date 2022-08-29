
module.exports = (sequelize, DataTypes) => {

return sequelize.define('produits', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },
        nom_produit:DataTypes.STRING(30),
        designation:DataTypes.STRING(30),
        prix_unitaire:DataTypes.FLOAT(),
        stock:DataTypes.INTEGER(),
        description:DataTypes.STRING(30),
        image_produit:DataTypes.STRING(30),
        categoryId:{field:"categories_id",type:DataTypes.INTEGER,references:"categories"}
    
},{tableName:"produits",freezeTableName:true, timestamps: false});

}