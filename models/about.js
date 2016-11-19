const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var About = new Schema({

	titulo: String,
	texto: String,
	parrafo: String,
	user_admin: String,
	about: String,
	date: Date

});

module.exports = mongoose.model('About',About);