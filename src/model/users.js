module.exports = (sequelize, DataTypes) => {
return sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
        nom_client:DataTypes.STRING(30),
        prenom_client:{type:DataTypes.STRING(30),field:"prenom_client" },
        adresse_livraison:DataTypes.STRING(30),
        adresse:DataTypes.STRING(30),
        password:DataTypes.STRING(30),
        email:DataTypes.STRING(30),
        role:DataTypes.STRING(30),
},{timestamps:false,freezeTableName:true,});
}