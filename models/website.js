const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Website = new Schema({

	nombre: String,
	url: String,
	description: String,
	urlImage: String,
	user_admin: String,
	date: Date

});

module.exports = mongoose.model('Website',Website);