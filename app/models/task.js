'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.Team = this.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'TeamTask'
      });
      this.Creator = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'Creator'
      });
      this.Assignee = this.belongsTo(models.User, {
        foreignKey: 'assigneeId',
        as: 'Assignee'
      });
    }
  };
  Task.init({
    teamId: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
    } },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

