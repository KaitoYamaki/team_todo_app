const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class CommentsController extends Controller {

  async store(req, res) {
    try {
    const task = await models.Task
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
module.exports = CommentsController;