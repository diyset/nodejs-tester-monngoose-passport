var mongoose = require('mongoose');

var gambarSchema = new mongoose.Schema({
	gambar : String
});

mongoose.model('Gambar', gambarSchema);