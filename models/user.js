const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({

	nombre: String,
	username: String,
	password: String,
	correo: String,
	urlImage: String,
	user_admin: String,
	date: Date

});

module.exports = mongoose.model('User',User);