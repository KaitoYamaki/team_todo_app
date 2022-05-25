const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  //team-create
  async create(req, res) {
    req.setLocale(req.query.lang || 'ja');
    res.render('teams/create');
  }
  //team-post
  async store(req, res) {
    try {
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