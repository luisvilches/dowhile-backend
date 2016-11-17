var User = require('.././models/user');



exports.renderSignup = (req,res,next) => {
	res.render('signup');
}

exports.render = (req,res,next) => {
	res.render('login');
	console.log(req.session.user_id);
}