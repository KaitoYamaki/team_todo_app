const Controller = require('./controller');
const models = require('../models');
const team = require('../models/team');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = await task.getTeamTask();
    res.render('tasks/show', { task: task, team: team });
  }
}

module.exports = TasksController; 