var User = require('.././models/user');


exports.renderAdmin = (req,res,next) => {
	debugger
	res.render('admin/index');
}

exports.iniciarSesion = (req,res,next) => {
	User.findOne({correo: req.body.correo, password: req.body.password },(err,user)=>{
		if (err) {
			console.log('ERROR: '+err);
		}
		else{
			req.session.user_id = user._id;
			console.log(req.session.user_id);
			res.redirect('/admin/app');
			//res.send('hola');
		}
	})
}