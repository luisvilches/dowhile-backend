const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const nodemailer = require('nodemailer');
const fs = require('fs');



require('events').EventEmitter.defaultMaxListeners = Infinity;

var routes = require('./routes/index');
var session = require('./middleware/session');

var app = express();
const develop = 'mongodb://127.0.0.1/develop';
const produccion = 'mongodb://dowhile.cl/develop';


let db = produccion;


let msg_server = "corriendo en el puerto: ";

/////// CONFIGURACIONES ////////////////////////

app.set('port', process.env.PORT || 4000);
app.set('Views', path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.set("jsonp callback", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static('public'));
app.use(cors());
app.use(cookieSession({
	name: 'session',
	keys: ['keysOne', 'keysTwo']
}));

app.use(methodOverride('_method'));
//app.use(formidable({ keepExtensions: true,encoding: 'utf-8'}));

app.use('/admin',session);
app.use('/',routes);

///////////////////////////////////////////////

/////// CONECCION BASE DE DATOS ///////////////

//mongoose.connect('mongodb://localhost/test', function(err,res){

mongoose.connect(db,(err,res) => {
	if (err) {console.log(err); 
	};
});

///////////////////////////////////////////////

/////// SERVIDOR //////////////////////////////

app.listen(app.get('port'), () => {
	console.log(msg_server + app.get('port'));
});
