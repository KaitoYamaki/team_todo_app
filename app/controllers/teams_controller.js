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
      res.redirect(`/teams/${team.id}`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/create', { err: err } );
      } else {
        throw err;
      }
    }
  }

  //team-show
  async show(req, res) {
    const team = await models.Team.findByPk(req.params.team);
    await team.getTasks({include: 'Assignee'});
    res.render('teams/show', { team: team, tasks: tasks } );
  }

  //team-edit
  async edit(req, res) {
    const team = await models.Team.findByPk(req.params.team);
    res.render('teams/edit', { team: team } );
  }

  //team-update
  async update(req, res) {
    try {
      const team = await models.Team.findByPk(req.body.id);
      team.set(req.body);
      await team.save( { fields: ['name'] } );
      await req.flash('info', `新規チーム${team.name}を編集しました`);
      res.redirect(`/teams/${team.id}/edit`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/edit', { err: err } );
      } else {
        throw err;
      }
    }
  }
}
module.exports = TeamsController;