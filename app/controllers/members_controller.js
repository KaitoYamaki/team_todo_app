const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');
const user = require('../models/user');

class MembersController extends Controller {
  async index(req, res){
    const team = await models.Team.findByPk(req.params.team);
    const users = await models.User.findAll();
    const memberUsers = await team.getMemberUsers();
    res.render('members/index', { team: team, memberUsers: memberUsers, users: users} );
  }

  async store(req, res) {
    try {
      const team = req.params.team
      const member = models.Member.build({
        userId: req.body.userId,
        teamId: team,
      })
      await member.save({ fields: [ 'userId', 'teamId'] });
      await req.flash('info', '新規メンバーを追加しました');
      res.redirect(`/teams/${member.teamId}/members`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('tasks/create', { err: err });
      } else {
        throw err;
      }
    }
  }

  
}

module.exports = MembersController;