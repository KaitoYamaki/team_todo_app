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
      this.Comments = this.hasMany(models.Comment, {
        foreignKey: 'taskId',
        as: 'Comments'
      });
    }
    static async createComment(user) {
      const manageMember = await user.getUserMember({ where: { teamId: this.id, role: 1 }});
      return Boolean(manageMember.length);
    };

    async finish(user, body){
      const task = await this.update({ 
        status: 1
      });
      task.createComment({
        taskId: task.id,
        creatorId: user.id,
        message: body.comment,
        kind: 1
      });
    }
  }
  Task.init({
    teamId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'タイトルは空ではいけません'
        },
        len: {
          args: [1, 10],
          msg: 'タイトルは10文字未満です'
        },
      }
    },
    body: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 30],
          msg: '本文は30文字未満です'
        }
      }
    },
    status: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};

