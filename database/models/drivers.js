'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      drivers.hasOne(models.hardwares);  
    }

  }
  drivers.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'drivers',
    paranoid:false,
    timestamps:false
  });
  return drivers;
};