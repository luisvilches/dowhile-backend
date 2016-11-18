var User = require('.././models/user');

exports.crearUsuario = (req,res,next) => {

	var dir = req.file.destination.split('/').pop();
	var file = req.file.originalname;
	console.log(req.file);

	let usuario = new User({


		nombre: req.body.nombre,
		username: req.body.username,
		password: req.body.password,
		correo: req.body.correo,
		urlImage: '/'+dir+'/'+file,
		date: new Date()
	});

	usuario.save((err, data) => {
		if (err) {
			console.log('ERROR: '+err);
		}else{
			console.log(data);
			res.status(200);
			res.redirect('/admin/app/user');
		};
	});
}

exports.render = (req,res,next) => {
	User.find((err,data)=>{
		if (err) {console.log(err)}

		res.render('admin/user',{user: data});
	})
}

exports.delete = (req,res,next)=>{
	User.remove({_id: req.params.id}, function(error){
      if(error){
         res.send('Error al intentar eliminar el usuario.');
      }else{ 
         res.redirect('/admin/app/user');
      }
   });
}

exports.editUser = (req,res,next)=>{
	var item = new User({
		_id: req.params.id,
		nombre: req.body.nombre,
		username: req.body.username,
		password: req.body.password,
		correo: req.body.correo,
		urlImage: req.body.image,
		date: new Date()
	});

	User.update({_id: req.params.id},item,(doc) =>{
		res.redirect('/admin/app/user');
		console.log(doc)
	})	
}

exports.edit = (req,res,next)=>{
	User.findOne({_id: req.params.id},(err,data)=>{
		console.log(data);
		res.render('admin/editUser',{user: data});
	})
}


exports.createUserInit = (req,res)=>{
	let usuario = new User({


		nombre: 'dowhile',
		username: 'dowhile',
		password: 'admin',
		correo: 'admin@dowhile.cl',
		urlImage: '',
		date: new Date()
	});

	usuario.save((err, data) => {
		if (err) {
			console.log('ERROR: '+err);
		}else{
			console.log(data);
			res.status(200);
		};
	});
}