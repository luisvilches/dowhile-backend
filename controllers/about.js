var About = require('.././models/about');

exports.render = (req,res) =>{
	About.findOne({about:'about'},(err,data)=>{
		if (err) {console.log(err)}
		res.render('admin/about',{about: data});
	});
}

exports.collection = (req,res,next)=>{
	var data = new About({
		titulo: 'Titulo del quienes somos',
		texto: 'Texto de quienes somos',
		parrafo: 'segundo parrafo',
		user_admin: 'Default',
		about: 'about',
		date: new Date()
	});

	data.save((err,doc)=>{
		if (err) {console.log(err)}
		res.status(200);
		console.log(doc);
		res.end();
	});
}

exports.viewApiHeader = (req,res)=>{
	About.findOne({about:'about'},(err,data)=>{
		if (err) {console.log(err)}
		res.status(200).jsonp({about: data});
	});
}


exports.editsave = (req,res,next)=>{
	var item = new About({
		_id: req.params.id,
		titulo: req.body.titulo,
		texto: req.body.texto,
		parrafo: req.body.parrafo,
		user_admin: req.body.user_admin,
		date: new Date()
	});

	About.update({about:'about'},item,(doc) =>{
		res.redirect('http://localhost:4000/admin/app/about');
		console.log(doc)
		res.redirect('/')
	})	
}