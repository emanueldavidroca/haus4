'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hardwares_available extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hardwares_available.belongsTo(models.types,{foreignKey:"typeId",as:'type',targetKey: 'id'});
      hardwares_available.hasOne(models.hardwares);  
    }
  }
  hardwares_available.init({
    hardware_name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    startingColdTemp: DataTypes.INTEGER,
    startingWarmTemp: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hardwares_available',
    paranoid:true,
    timestamps:true
  });
  return hardwares_available;
};