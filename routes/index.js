var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');
var session = require('.././middleware/session');
const multer = require('multer');
const crypto = require('crypto');


var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, 'public/images');
		//cb(null, 'tmp')
	},
	filename: function(req,file,cb){
		cb(null,  file.originalname); 
	}
})

var upload = multer({storage : storage});

/////// API ///////////////////////

router.get('/login', controllers.login.render);
router.get('/signup', controllers.login.renderSignup)
router.post('/login', controllers.admin.iniciarSesion)
router.get('/admin/app', controllers.admin.renderAdmin)
router.get('/',function(req,res){
	res.redirect('/admin/app');
})
router.get('/removeSession', function(req,res){
	req.session = null;
	res.redirect('/login');
})

router.post('/mail', controllers.mail.mail)
///////////// Usuarios ////////////

router.get('/admin/app/user', controllers.users.render)
router.get('/admin/app/user/:id', controllers.users.edit)
router.delete('/admin/app/user/:id', controllers.users.delete)
router.put('/admin/app/user/:id', controllers.users.editUser)
router.post('/admin/app/user',upload.single('fileImage'), controllers.users.crearUsuario)
router.get('/createsuperuser', controllers.users.createUserInit)
 

///////////// admin website ///////


router.get('/admin/app/website', controllers.website.render)
router.get('/api/website/', controllers.website.viewAll)
router.post('/admin/app/website',upload.single('fileImage'), controllers.website.newWebsite)
router.get('/admin/app/website/new', controllers.website.renderForm)
router.delete('/admin/app/website/remove/:id', controllers.website.deleteWebsite)
router.get('/admin/app/website/edit/:id', controllers.website.edit)
router.put('/admin/app/website/edit/id/:id',controllers.website.editsave)

///////////// admin header ///////////////////////////////////////////////

router.get('/admin/app/header', controllers.header.render)
router.get('/api/header', controllers.header.viewApiHeader)
router.put('/admin/app/header/edit/:id', controllers.header.editsave)
router.get('/admin/app/header/createCollection', controllers.header.collection)

///////////// admin quienes somos ///////////////////////////////////////////////

router.get('/admin/app/about', controllers.about.render)
router.get('/api/about', controllers.about.viewApiHeader)
router.put('/admin/app/about/edit/:id', controllers.about.editsave)
router.get('/admin/app/about/createCollection', controllers.about.collection)




module.exports = router;