var mongoose = require('mongoose');

var programSchema = new mongoose.Schema({
	namaProgram : {type:String, unique:true},
	deskripsi : String,
	macamProgram : [{
		lamaBelajar : String,
		deskrip : String,
		biaya : String
	}]
});

mongoose.model('Program', programSchema); 
