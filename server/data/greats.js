var mongoose = require('mongoose');

var greatSchema = new mongoose.Schema({
	judul : String,
	gambar : String,
	deskripsi : String
});

mongoose.model('Great', greatSchema);