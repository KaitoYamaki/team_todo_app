const { ValidationError } = require('sequelize');
const Controller = require('./controller');
const models = require('../models');

class TeamsController extends Controller {
  //team-create
  async create(req,res) {
    const teamId = req.params.team;
    res.render(`tasks/create`, {teamId});
  }

}