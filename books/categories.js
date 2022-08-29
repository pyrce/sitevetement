

module.exports = (sequelize, DataTypes) => {
return  sequelize.define('categories', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_categorie:DataTypes.STRING(30),
        etat:DataTypes.INTEGER,
},{tableName:"categories",freezeTableName:true, timestamps: false});

}