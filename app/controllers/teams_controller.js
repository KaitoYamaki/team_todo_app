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
      const user = req.user;
      const team = models.Team.build({
        name: req.body.name,
        ownerId: user.id
      });
      await team.save({ fields: ['name', 'ownerId'] });
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