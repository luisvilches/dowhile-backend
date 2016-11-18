var Website = require('.././models/website');


exports.render = (req,res,next) => {
	Website.find((err,data)=>{
		if (err) {console.log(err)}

		res.render('admin/website',{website: data});
		//res.status(200).jsonp({website: data});
	})
}

exports.viewAll = (req,res,next) => {
	Website.find({}).sort({date: -1}).exec((err,data)=>{
		if (err) {console.log(err)}

		res.status(200).jsonp({website: data});
	})
}

exports.newWebsite = (req,res,next)=>{
	var dir = req.file.destination.split('/').pop();
	var file = req.file.originalname;
	console.log(req.file);
	var data = new Website({
		nombre: req.body.name,
		url: req.body.url,
		description: req.body.description,
		urlImage: '/'+dir+'/'+file,
		user_admin: req.body.user_admin,
		date: new Date()
	});

	data.save((err,doc)=>{
		if (err) {console.log(err)}

		res.status(200);
		console.log(doc);
		res.redirect('http://dowhile.cl:4000/admin/app/website');

	})
}

exports.deleteWebsite = (req,res,next)=>{
	Website.remove({_id: req.params.id}, function(error){
      if(error){
         res.send('Error al intentar eliminar el sitio web.');
      }else{ 
         res.redirect('http://dowhile.cl:4000/admin/app/website');
      }
   });
}

exports.renderForm = (req,res,next)=>{
	res.render('admin/newWebsite');
}

exports.edit = (req,res,next)=>{
	Website.findOne({_id: req.params.id},(err,data)=>{
		console.log(data);
		res.render('admin/editWebsite',{item: data});
	})
}

exports.editsave = (req,res,next)=>{
	var item = new Website({
		_id: req.params.id,
		nombre: req.body.name,
		url: req.body.url,
		description: req.body.description,
		user_admin: req.body.user_admin,
		date: new Date()
	});

	Website.update({_id: req.params.id},item,(doc) =>{
		res.redirect('http://dowhile.cl:4000/admin/app/website');
		console.log(doc)
	})	
}