const models = require('../models');

module.exports = async function managableTeam(req, res, next) {
  const team = await models.Team.findByPk(req.params.team)
  const manageMember = await team.getTeamMember({
    where: { role: 1, userId: req.user.id}
  });
  if(manageMember.length>0) {
    return next();
  }
  await req.flash('alert', 'アクセスできません');
    res.redirect('/');
}; 
