module.exports = (sequelize, DataTypes) => {
return sequelize.define('panier', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        quantite:DataTypes.INTEGER,
        prix_unitaire:DataTypes.FLOAT,
        userId:{field:"users_id",references:"users",type: DataTypes.INTEGER}
},{tableName:"panier",freezeTableName:true,timestamps: false});
}