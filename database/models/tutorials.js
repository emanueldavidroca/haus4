'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tutorials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        tutorials.belongsTo(models.types,{foreignKey:"typeId"});
    }
  }
  tutorials.init({
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tutorials',
    paranoid:true,
    timestamps:true
  });
  return tutorials;
};