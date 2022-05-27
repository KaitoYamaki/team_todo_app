const Controller = require('./controller');
const models = require('../models');

class TopController extends Controller {
  async index(req, res) {
    if(req.user) {
      const tasks = await models.Task.findAll({
        where: { assigneeId: req.user.id },
        include: "TeamTask"
      });
      const user = await models.User.findByPk(req.user.id);
      const members = await user.getUserMember({include: "Team"});
      res.render('index', { title: 'Express', user: req.user, tasks: tasks, members: members });
    } else {
      res.render('index', { title: 'Express', user: req.user });
    }
  }
}

module.exports = TopController;