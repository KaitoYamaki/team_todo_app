const { Route } = require('../lib/route');
const forceLogin = require('../app/middlewares/force_login');
const forceAdmin = require('../app/middlewares/force_admin');
const managable_team = require('../app/middlewares/managable_team');

const route = new Route();

route.get('/', 'top_controller@index')

// single style
route.get('/user/edit', forceLogin, 'users_controller@edit');
route.put('/user', forceLogin, 'users_controller@update');

// resource style
route.resource('examples', 'examples_controller');

route.resource('manager/teams', managable_team, { controller: 'manager/teams_controller', only: [ 'create', 'store', 'update', 'show', 'edit' ] } );
route.resource('teams', { controller: 'teams_controller', only: [ 'create', 'store' ] } );

// route.post('/tasks/:task/comments', forceLogin, 'tasks_controller@comment');

const teamRoute = route.sub('/manager/teams/:team', forceLogin, managable_team);
teamRoute.resource('tasks', {controller: 'manager/tasks_controller', only: ['create','store','edit','update'] } );
teamRoute.resource('members', {controller: 'manager/members_controller', only: ['index', 'store'] } );

route.get('/tasks/:task', 'tasks_controller@show');
route.post('/tasks/:task/comments', forceLogin, 'tasks_controller@comment');

// /adminのURL階層の作成。ログインチェック、管理者チェックが有効。
const adminRoute = route.sub('/admin', forceLogin, forceAdmin);
adminRoute.resource('users', 'admin/users_controller');

module.exports = route.router;
