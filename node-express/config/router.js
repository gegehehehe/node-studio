// 控制器
var Movie = require('../app/controllers/movie.js');
var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Comment = require('../app/controllers/comment.js');
const _ = require('underscore');
	
module.exports = function(app) { 
	app.use((req, res, next) => {
		app.locals.user = req.session.user;
		next();
	});

	// 路由, 首页, index
	app.get('/', Index.index);



	app.get('/loginout', User.loginout);
	// 用户注册
	app.post('/user/signup/', User.signup);
	// 用户登录
	app.post('/user/signin/', User.signin);
	// 用户详情页
	app.get('/signin', User.showSignin);
	app.get('/signup', User.showSignup);
	app.get('/admin/userlist', User.signinRequired, User.roleRequired, User.userlist);



	// 详情页, detail 
	app.get('/movie/:id', Movie.detail);
	// 后台路由, 添加admin
	app.get('/admin/movie', User.signinRequired, User.roleRequired, Movie.movie);
	// 删除记录
	app.delete('/admin/delete/', User.signinRequired, User.roleRequired, Movie.del);
	// 
	app.get('/admin/update/:id', User.signinRequired, User.roleRequired, Movie.update);
	// admin post movie
	app.post('/admin/movie/new', User.signinRequired, User.roleRequired, Movie.newMovie);
	// 
	app.get('/admin/list', User.signinRequired, User.roleRequired, Movie.movieList);



	//评论
	app.post('/user/comment/', User.signinRequired, Comment.save)



}