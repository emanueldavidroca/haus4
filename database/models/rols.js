'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        rols.belongsToMany(models.users,{through:"Rolusers"});
    }
  }
  rols.init({
    rol: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'rols',
    paranoid:true,
    timestamps:false
  });
  return rols;
};