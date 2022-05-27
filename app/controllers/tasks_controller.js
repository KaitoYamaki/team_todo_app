const Controller = require('./controller');
const models = require('../models');

class TasksController extends Controller {
  async show(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = await task.getTeamTask();
    res.render('tasks/show', { task: task, team: team });
  }

  async show(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = await task.getTeamTask();
    const comments = await task.gettaskComment({ include: User})
    res.render('tasks/show', { task: task, team: team, comments: comments });
  }

  async comment(req, res) {
    try{
      if(req.body.status === '1') {
        const task = await models.Task.findByPk(req.params.task);
        task.finish(req.user, req.body);
      } else {
        await models.Comment.create({
          taskId: req.params.id,
          creatorid: req.user.id,
          message: req.body.comment,
          kind: 0
        });
      }
      res.redirect(`/tasks/${req.params.task}`)
    } catch (err) {
      if(err instanceof ValidationError) {
        res.render('tasks/show', { err: err });
      } else{
        throw err;
      }
    }
  }
}

module.exports = TasksController; 