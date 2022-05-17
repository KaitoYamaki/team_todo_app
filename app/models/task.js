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

