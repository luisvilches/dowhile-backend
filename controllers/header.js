var Header = require('.././models/header');

exports.render = (req,res) =>{
	Header.findOne({tituloHome:'titulohome'},(err,data)=>{
		if (err) {console.log(err)}
		res.render('admin/adminHeader',{header: data});
	});
}

exports.collection = (req,res,next)=>{
	var data = new Header({
		titulo: 'Titulo del Header',
		texto: 'Texto de pie de titulo',
		user_admin: 'Default',
		tituloHome: 'titulohome',
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
	Header.findOne({tituloHome:'titulohome'},(err,data)=>{
		if (err) {console.log(err)}
		res.status(200).jsonp({header: data});
	});
}


exports.editsave = (req,res,next)=>{
	var item = new Header({
		_id: req.params.id,
		titulo: req.body.titulo,
		texto: req.body.texto,
		parrafo: req.body.parrafo,
		user_admin: req.body.user_admin,
		date: new Date()
	});

	Header.update({tituloHome:'titulohome'},item,(doc) =>{
		res.redirect('http://localhost:4000/admin/app/header');
		console.log(doc)
		res.redirect('/')
	})	
}