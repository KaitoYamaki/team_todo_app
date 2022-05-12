'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.Owner = this.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
      });
    }
    static associate(models) {
      this.Task = this.hasMany(models.Task, {
        foreignKey: 'teamId',
        as: 'Team'
      })
    } 
  }
  Team.init({
    name: {
      type: DataTypes.STRING
    },
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
