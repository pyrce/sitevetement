
const { Sequelize, DataTypes, Model } = require('sequelize');
const produitsModel = require('./produits');
const catModel = require('./categories');


const sequelize = new Sequelize(
 'vetement',
 'postgres',
 'password',
  {
    host: 'localhost',
    dialect: 'postgres',
    port:5432,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: str=>      console.log(str)
  }
);

const produits=produitsModel(sequelize,Sequelize);
const categories=catModel(sequelize,Sequelize);
categories.hasMany(produits, {
    foreignKey: produits.categoryId
});
produits.belongsTo(categories, {
    foreignKey: produits.categoryId
});

module.exports = {
    produits,
    categories
  }