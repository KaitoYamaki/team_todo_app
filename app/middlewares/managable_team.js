const models = require('../models');
module.exports = async function managableTeam(req, res, next) {
  const team = await models.Team.findByPk(req.params.team)
  const user = await models.User.findByPk(req.user.id);
  if (!await team.isManager(user)) {
    await req.flash('alert', 'アクセスできません');
    res.redirect('/');
  }
  return next();
};
