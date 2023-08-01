'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hardwares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hardwares.belongsTo(models.users,{foreignKey:"technicianId",as:'technician',targetKey: 'id'});
      hardwares.belongsTo(models.users,{foreignKey:"userId",as:'user',targetKey: 'id'});
      hardwares.belongsTo(models.hardwares_available,{foreignKey:"hardwaresAvailableId",as:'hardwares_av',targetKey: 'id'});
      hardwares.belongsTo(models.types,{foreignKey:"typeId"});  
      hardwares.hasOne(models.rating_technicians);  
    }
  }
  hardwares.init({
    anotation: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    technicianId: DataTypes.INTEGER,
    hardwaresAvailableId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    priority: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hardwares',
    paranoid:true,
    timestamps:true
  });
  return hardwares;
};