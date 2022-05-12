const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  //task-create
  async create(req,res) {
    const teamId = req.params.team;
    res.render(`tasks/create`, { teamId });
  }
    //task-store
    async store(req, res) {
      try {
        const team = req.team
        const task = models.Task.build({
          // teamId: team.id,
          // title: req.body.title,
          // body: req.body.body
          teamId: 1,
          title: 'たけし',
          body: 'たけし'
    });
        await task.save({ fields: [ 'teamId', 'title', 'body' ] });
        await req.flash('info', `新規チーム${task.title}を作成しました`);
        res.redirect(`/teams/${team.id}`);
      } catch (err) {
        if(err instanceof ValidationError){
          res.render('tasks/create', { err: err });
        } else {
          throw err;
        }
      }
    }
}
module.exports = TasksController;