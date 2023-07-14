'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsToMany(models.rols,{through:"Rolusers"});
      users.hasOne(models.requirements,{foreignKey:"technicianId"});
      users.hasOne(models.requirements,{foreignKey:"userId"});
      users.hasOne(models.rating_technicians,{foreignKey:"ratedBy"});
      users.hasOne(models.rating_technicians,{foreignKey:"technicianId"});
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'users',
    paranoid:true,
    timestamps:true
  });
  return users;
};