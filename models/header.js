const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Header = new Schema({

	titulo: String,
	texto: String,
	parrafo: String,
	user_admin: String,
	tituloHome: String,
	date: Date

});

module.exports = mongoose.model('Header',Header);