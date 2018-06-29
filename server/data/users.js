var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	nama : {type: String, required: true},
	username : {type: String, required: true, unique:true},
	phone : String,
	password : String,
	status : String
});

mongoose.model('User', userSchema);