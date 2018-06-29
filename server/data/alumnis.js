var mongoose = require('mongoose');

var alumniSchema = new mongoose.Schema({
	nama : String,
	foto : String,
	telpon : String,
	bbm : String
});

mongoose.model('Alumni', alumniSchema);
