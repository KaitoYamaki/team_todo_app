'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.User = this.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'User'
      });
      this.Tasks = this.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'Task'
      });
    }
  }
  Comment.init({
    taskId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    kind: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};