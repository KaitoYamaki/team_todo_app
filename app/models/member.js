'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {

      this.User = this.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'User'
      });
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'Team'
      });
    }
  }
  Member.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};