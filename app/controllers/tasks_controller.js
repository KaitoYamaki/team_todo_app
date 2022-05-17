const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  //task-create
  async create(req, res) {
    const team = req.params.team;
    res.render(`tasks/create`, { team } );
  }
  //task-store
  async store(req, res) {
    try {
      const task = models.Task.build({
        title: req.body.title,
        body: req.body.body,
        teamId: req.params.team,
        status: 0,
      })
      await task.save({ fields: [ 'teamId', 'title', 'body', 'status'] });
      await req.flash('info', `新規カテゴリ${task.title}を作成しました`);
      res.redirect(`/teams/${task.teamId}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('tasks/create', { err: err });
      } else {
          throw err;
      }
    }
  }
    
  async edit(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = req.params.team;
    res.render('tasks/edit', { team: team, task: task } );
  }

  async update(req, res) {
    try {
      const task = await models.Task.findByPk(req.body.id); //---[1]
      task.set(req.body);
      await task.save({ fields: ['title', 'body'] });
      await req.flash('info', `${task.title}を変更しました`);
      res.redirect(`/teams/${task.teamId}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render('tasks/edit', { task: req.body, err });
      } else {
        throw err;
      }
    }
  }
}
module.exports = TasksController;