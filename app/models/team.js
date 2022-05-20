'use strict';
const models = require('../models');

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
        as: 'Tasks'
      });
      this.TeamMember = this.hasMany(models.Member, {
        foreignKey: 'teamId',
        as: 'TeamMember'
      });
    }
    static async createWithOwner(user, body){
      const team = await this.create({
        name: body.name,
        ownerId: user.id
      });
      console.log(team);
      await team.createTeamMember({
        teamId: team.id,
        userId: user.id,
        role: 1
      });
      return team;
    };

    static async isManager(user) {
      const manageMember = await user.getUserMember({
        where: { teamId: this.id }
      });
      const member = manageMember[0]
      return
    };

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


