const models = require('../models');

module.exports = async function managableTeam(req, res, next) {
  const team = await models.Team.findByPk(req.params.team)
  const manageMember = await team.getTeamMember({
    where: { role: 1 }
  });
  const manageUser = manageMember[0];
  if(manageUser.userId === req.user.id) {
    return next();
  }
    else 
    await req.flash('alert', 'アクセスできません');
      res.redirect('/');
}; 



module.exports = async function managableTeam(req, res, next) {
    // 省略
  
    if (!await team.isManager(user)) {
      await req.flash('alert', 'アクセスできません');
      res.redirect('/');
    }
    return next();
  };
