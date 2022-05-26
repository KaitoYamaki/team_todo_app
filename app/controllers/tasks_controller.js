const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findByPk(req.params.team);
    res.render('tasks/show', { task: task });
  }
}

module.exports = TasksController; 