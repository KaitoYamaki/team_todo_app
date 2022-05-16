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
      this.Tasks = this.hasMany(models.Task, {
        foreignKey: 'teamId',
        as: 'Task'
      });
      this.TeamMember = this.hasMany(models.Member, {
        foreignKey: 'teamId',
        as: 'TeamMember'
      });
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


