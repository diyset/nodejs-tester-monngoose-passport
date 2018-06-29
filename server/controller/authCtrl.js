var mongoose = require('mongoose');
require('../data/users');
var User = mongoose.model('User');

module.exports.tambahAdmin = function(req, res){
	var user = new User(req.body);
	user.save();
	res.json(req.body);
}
module.exports.tampilAdmin = function(req, res){
	User.find(function(err, data){
		res.json(data);
	});
}
module.exports.editAdmin = function(req, res){
	User.findById(req.params.id, function(err, data){
		res.json(data);
	})
}
module.exports.updateAdmin = function(req, res){
	User.findById(req.params.id, function(err, data){
		data.nama = req.body.nama;
		data.username = req.body.username;
		data.phone = req.body.phone;
		data.password = req.body.password;
		data.status = req.body.status;
		data.save();
		res.json(data);
	})
}
module.exports.hapusAdmin = function(req, res){
	User.findById(req.params.id, function(err, data){
		data.remove(function(er, doc){
			res.json(doc);
		})
	})
}

require('../data/gambars');
var Gambar = mongoose.model('Gambar');

module.exports.tambahTampilan = function(req, res){
	var gambar = new Gambar(req.body);
	gambar.save();
	res.json(req.body);
}
module.exports.tampilTampilan = function(req, res){
	Gambar.find(function(err, data){
		res.json(data);
	})
}
module.exports.editTampilan = function(req, res){
	Gambar.findById(req.params.id, function(err, data){
		res.json(data);
	})
}
module.exports.updateTampilan = function(req, res){
	Gambar.findById(req.params.id, function(err, data){
		data.gambar = req.body.gambar;
		data.save();
		res.json(data);
	})
}

require('../data/greats');
var Great = mongoose.model('Great');

module.exports.tambahGreat = function(req, res){
	var great = new Great(req.body);
	great.save();
	res.json(req.body);
}
module.exports.tampilGreat = function(req, res){
	Great.find(function(err, data){
		res.json(data);
	})
}
module.exports.editGreat = function(req, res){
	Great.findById(req.params.id, function(err, data){
		res.json(data);
	})
}
module.exports.updateGreat = function(req, res){
	Great.findById(req.params.id, function(err, data){
		data.judul = req.body.judul;
		data.gambar = req.body.gambar;
		data.deskripsi = req.body.deskripsi;
		data.save();
		res.json(data);
	})
}

require('../data/programs');
var Program = mongoose.model('Program');

module.exports.tambahProgram = function(req, res){
	var program = new Program(req.body);
	program.save();
	res.json(req.body);
}
module.exports.tampilProgram = function(req, res){
	Program.find(function(err, data){
		res.json(data);	
	})
}

module.exports.hapusProgram = function(req, res){
	Program.findById(req.params.id, function(err, data){
		data.remove(function(er, doc){
			res.json(doc);
		})
	})
}

module.exports.editProgram = function(req, res){
	Program.findById(req.params.id, function(err, data){
		res.json(data);
	})
}

module.exports.updateProgram = function(req, res){
	Program.findById(req.params.id, function(err, data){
		data.namaProgram = req.body.namaProgram;
		data.deskripsi = req.body.deskripsi;
		data.save();
		res.json(data);
	})
}

module.exports.tambahMacam = function(req, res){
	Program.update({"_id":req.params.id}, {"$push" : {"macamProgram" : {
		"lamaBelajar" : req.body.lamaBelajar,
		"deskrip" : req.body.deskrip,
		"biaya" : req.body.biaya
	}}}, function(err, data){
		res.json(data);
	})
}

module.exports.getMacam = function(req, res){
	Program.findById(req.params.id, {"macamProgram":{"$elemMatch":{"_id":req.params.idsub}}}, function(err, data){
		res.json(data);
	})
}

module.exports.updateMacam = function(req, res){
	Program.update({"_id":req.params.id, "macamProgram._id":req.params.idsub},{"$set": {
		"macamProgram.$" : {
			"lamaBelajar" : req.body.lamaBelajar,
			"deskrip" : req.body.deskrip,
			"biaya" : req.body.biaya
		}
	}}, function(err, data){
		res.json(data);
	});
}

module.exports.deleteMacam = function(req, res){
	Program.update({"_id":req.params.id}, {"$pull" : {"macamProgram" : {"_id": req.params.idsub}}}, function(err, data){
		res.json(data);
	})
}

require('../data/murids');
var Murid = mongoose.model('Murid');

module.exports.tambahMurid = function(req, res){
	var murid = new Murid(req.body);
	murid.save();
	res.json(req.body);
}

module.exports.tampilMurid = function(req, res){
	Murid.find(function(err, data){
		res.json(data);
	});
}
module.exports.statusMurid = function(req, res){
	Murid.update({"_id":req.params.id}, {"$set":{
	   "status":"dilihat"
	}}, function(err, data){
		res.json(data);
	})
}
module.exports.getprogram = function(req, res){
	Program.findOne({"namaProgram":req.params.nama}, function(err, data){
		res.json(data);
	})
}
module.exports.getmurid = function(req, res){
	Murid.findById(req.params.id, function(err, data){
		res.json(data);
	})
}
module.exports.hapusMurid = function(req, res){
	Murid.findById(req.params.id, function(err, data){
		data.remove(function(err, doc){
			res.json(doc);
		})
	})
}

require('../data/alumnis');
var Alumni = mongoose.model('Alumni');

module.exports.tambahAlumni = function(req, res){
	var alumni = new Alumni(req.body);
	alumni.save();
	res.json(req.body);
}
module.exports.getAlumni = function(req, res){
	Alumni.find(function(err, data){
		res.json(data);
	})
}
module.exports.ambilAlumni = function(req, res){
	Alumni.findById(req.params.id, function(err, data){
		res.json(data);
	})
}
module.exports.updateAlumni = function(req, res){
	Alumni.findById(req.params.id, function(err, data){
		data.nama = req.body.nama;
		data.foto = req.body.foto;
		data.telpon = req.body.telpon;
		data.bbm = req.body.bbm;
		data.save();
		res.json(data);
	})
}
module.exports.hapusAlumni = function(req, res){
	Alumni.findById(req.params.id, function(err, data){
		data.remove(function(err, doc){
			res.json(doc);
		})
	})
}