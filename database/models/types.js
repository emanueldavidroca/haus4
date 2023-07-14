'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        types.belongsTo(models.categories,{foreignKey:"categoryId"});
        types.hasOne(models.tutorials);
        types.hasOne(models.requirements);
    }
  }
  types.init({
    type: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'types',
    paranoid:true,
    timestamps:false
  });
  return types;
};