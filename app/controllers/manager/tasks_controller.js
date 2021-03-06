const { ValidationError } = require('sequelize');
const Controller = require('../controller');
const models = require('../../models');

class TasksController extends Controller {
  //task-create
  async create(req, res) {
    const teamId = req.params.team;
    const team = await models.Team.findByPk(teamId);
    const members = await team.getTeamMember({include: 'User'});
    res.render('manager/tasks/create', { team, members} );
  }

  
    //task-store
    async store(req, res) {
      try {
        const task = models.Task.build({
          title: req.body.title,
          body: req.body.body,
          teamId: req.params.team,
          assigneeId: req.body.selectsAssigneeId,
          creatorId: req.user.id,
          status: 0,
        });
        // console.log(task.id);
        console.log(task);
        await task.save();
        await req.flash('info', `新規カテゴリ${task.title}を作成しました`);
        res.redirect(`/manager/teams/${task.teamId}`);
      } catch (err) {
        if(err instanceof ValidationError){
          const team = await models.Team.findByPk(req.params.team);
          const members = await team.getTeamMember({ include: 'User' });
          res.render('manager/tasks/create', { team, members, err: err });
        } else {

          throw err;
      }
    }
  }
    
    async edit(req, res) {
      const task = await models.Task.findByPk(req.params.task);
      const teamId = req.params.team;
      const team = await models.Team.findByPk(teamId);
      const members = await team.getTeamMember({include: 'User'});
      res.render('manager/tasks/edit', { team, task, members } );
    }

  async update(req, res) {
    try {
      const task = await models.Task.findByPk(req.body.id); //---[1]
      task.set(req.body);
      await task.save({ fields: ['title', 'body'] });
      await req.flash('info', `${task.title}を変更しました`);
      res.redirect(`/manager/teams/${task.teamId}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.render('manager/tasks/edit', { task: req.body, err });
      } else {
        throw err;
      }
    }
  }
}
module.exports = TasksController;