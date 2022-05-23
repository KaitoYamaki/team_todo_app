const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  //team-create
  async create(req, res) {
    res.render('teams/create');
  }
  //team-post
  async store(req, res) {
    try {
    //   const user = req.user;
    //   const team = await models.Team.create({
    //     name: req.body.name,
    //     ownerId: user.id
    //   });
    //   await models.Member.create({
    //     teamId: team.id,
    //     userId: req.user.id,
    //     role: 1
    //   })
    const team = await models.Team.createWithOwner(req.user, req.body);
      await req.flash('info', `新規チーム${team.name}を作成しました`);
      res.redirect(`/manager/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/create', { err: err } );
      } else {
        throw err;
      }
    }
  }
}
module.exports = TeamsController;