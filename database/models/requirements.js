'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      requirements.belongsTo(models.users,{foreignKey:"technicianId",as:'technician',targetKey: 'id'});
      requirements.belongsTo(models.users,{foreignKey:"userId",as:'user',targetKey: 'id'});
      requirements.belongsTo(models.types,{foreignKey:"typeId"});  
      requirements.hasOne(models.rating_technicians);  
    }
  }
  requirements.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    anotation: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    technicianId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'requirements',
    paranoid:true,
    timestamps:true
  });
  return requirements;
};