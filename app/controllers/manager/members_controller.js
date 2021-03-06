const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');
const user = require('../../models/user');

class MembersController extends Controller {
  async index(req, res){
    const team = await models.Team.findByPk(req.params.team);
    const users = await models.User.findAll();
    // const memberUsers = await team.getMemberUsers();
    const memberUsers = await team.getTeamMember({include: 'User'});
    res.render('manager/members/index', { team, users, memberUsers} );
  }

  async store(req, res) {
    try {
      const team = req.params.team
      const member = models.Member.build({
        userId: req.body.userId,
        teamId: team,
        role: 0
      })
      await member.save();
      await req.flash('info', '新規メンバーを追加しました');
      res.redirect(`/manager/teams/${member.teamId}/members`);
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