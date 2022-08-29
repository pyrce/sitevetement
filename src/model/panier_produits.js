module.exports = (sequelize, DataTypes) => {
return sequelize.define('panier_produit', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        produitId:{field:"produits_id",references:"produits",type:DataTypes.INTEGER},
        panierId:{field:"panier_id",references:"panier",type:DataTypes.INTEGER},
},{tableName:"panier_produits",freezeTableName:true,timestamps: false});

}