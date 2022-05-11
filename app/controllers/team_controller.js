const Controller = require('./controller');
const models = require('../models')

class TeamsController extends Controller {

  // GET /create
  async create(req, res) {
    res.render('teams/create');
  }

  // POST /
  // async store(req, res) {
  //   teams.push({ ...req.body, id: index++ });
  //   await req.flash('info', '保存しました');
  //   res.redirect('/examples/');
  // }

  // POST /create
  async store(req, res) {
    try {
      const team = await models.Team.createWithOwner(req.user, req.body);
      await req.flash('info', `新規チーム${team.name}を作成しました`);
      res.redirect(`/`);
    } catch (err) {
      if(err instanceof ValidationError){
        res.render('teams/create', { err: err });
      } else {
        throw err;
      }
    }
  }
}

module.exports = TeamsController;