var mongoose = require('mongoose');

var muridSchema = new mongoose.Schema({
	nama : String,
	alamat : String,
	telpon : String,
	jk : String,
	email :String,
	program : String,
	paket : String,
	status : String
});
mongoose.model('Murid', muridSchema);