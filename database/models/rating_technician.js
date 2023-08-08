'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating_technicians extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        rating_technicians.belongsTo(models.users,{foreignKey:"technicianId",as:'technician',targetKey: 'id'});
        rating_technicians.belongsTo(models.users,{foreignKey:"ratedBy",as:'user',targetKey: 'id'});
        rating_technicians.belongsTo(models.hardwares,{foreignKey:"hardwareId",as:'hardwares',targetKey: 'id'});  
    }
  }
  rating_technicians.init({
    hardwareId: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    ratedBy: DataTypes.INTEGER,
    technicianId: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'rating_technicians',
    timestamps:true
  });
  return rating_technicians;
};