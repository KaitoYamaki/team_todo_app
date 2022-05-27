const Controller = require('./controller');
const models = require('../models');
const { ValidationError } = require('sequelize');

class TasksController extends Controller {
 async show(req, res) {
    const task = await models.Task.findByPk(req.params.task);
    const team = await task.getTeamTask();
    const comments = await task.getComments({ include: 'User' })
    res.render('tasks/show', { task: task, team: team, comments: comments });
  }

  async comment(req, res) {
    try{
      if(req.body.status === '1') {
        const task = await models.Task.findByPk(req.params.task);
        console.log(task);
        task.finish(req.user, req.body);
      } else {
        await models.Comment.create({
          taskId: req.params.task,
          creatorId: req.user.id,
          message: req.body.comment,
          kind: 0
        });
      }
      res.redirect(`/tasks/${req.params.task}`)
    } catch (err) {
      if(err instanceof ValidationError) {
        const task = await models.Task.findByPk(req.params.task);
        res.render('tasks/show', { err, task } );
      } else{
        throw err;
      }
    }
  }
}

module.exports = TasksController; 