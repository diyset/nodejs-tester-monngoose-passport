var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var app = express();
mongoose.connect('mongodb://localhost:27017/KIGreat');
//mongodb://bapatemdbs:iqbal19@ds053166.mlab.com:53166/bapatemdbs
require('./server/data/users');
var User = mongoose.model('User');

app.use('/app', express.static(__dirname + "/app"));
app.use('/public', express.static(__dirname + "/public"));
app.use('node_modules', express.static(__dirname + "/node_modules"));

app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));
app.use(session({secret:"my secret"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username : username, password : password}, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false);
			}
			return done(null, user)
		});
}));
passport.serializeUser(function(user, done){
	done(null, user); 
});
passport.deserializeUser(function(user, done){
	User.findById(user._id, function(err, user){
		done(err, user);
	});
});

var authctrl = require('./server/controller/authCtrl')

//kontrol tampilan awal
app.post('/tampilan/tambah', authctrl.tambahTampilan);
app.get('/tampilan/tampil', authctrl.tampilTampilan);
app.get('/tampilan/edit/:id', authctrl.editTampilan);
app.put('/tampilan/update/:id', authctrl.updateTampilan);

//kontrol admin user
app.post('/admin/tambah', authctrl.tambahAdmin);
app.get('/admin/tampil', authctrl.tampilAdmin);
app.get('/admin/edit/:id', authctrl.editAdmin);
app.put('/admin/update/:id', authctrl.updateAdmin);
app.delete('/admin/hapus/:id', authctrl.hapusAdmin);

//kontrol tentang great
app.post('/great/tambah', authctrl.tambahGreat);
app.get('/great/tampil', authctrl.tampilGreat);
app.get('/great/edit/:id', authctrl.editGreat);
app.put('/great/update/:id', authctrl.updateGreat);

//kontrol program biaya
app.post('/program/tambah', authctrl.tambahProgram);
app.get('/program/tampil', authctrl.tampilProgram);
app.delete('/program/hapus/:id', authctrl.hapusProgram);
app.get('/program/edit/:id', authctrl.editProgram);
app.put('/program/update/:id', authctrl.updateProgram);
app.post('/program/tambahMacam/:id', authctrl.tambahMacam);
app.get('/program/getMacam/:id/:idsub', authctrl.getMacam);
app.put('/program/updateMacam/:id/:idsub', authctrl.updateMacam);
app.delete('/program/deleteMacam/:id/:idsub', authctrl.deleteMacam);

//kontrol murid
app.post('/murid/tambah', authctrl.tambahMurid);
app.get('/murid/tampil', authctrl.tampilMurid);
app.put('/murid/status/:id', authctrl.statusMurid);
app.get('/murid/getprogram/:nama', authctrl.getprogram);
app.get('/murid/getmurid/:id', authctrl.getmurid);
app.delete('/murid/hapus/:id', authctrl.hapusMurid);

//kontrol alumni
app.post('/alumni/tambah', authctrl.tambahAlumni);
app.get('/alumni/getAlumni', authctrl.getAlumni);
app.get('/alumni/getAlumni/:id', authctrl.ambilAlumni);
app.put('/alumni/updateAlumni/:id', authctrl.updateAlumni);
app.delete('/alumni/hapusAlumni/:id', authctrl.hapusAlumni);

//login user
app.post('/api/login', passport.authenticate("local"), function(req, res){
	res.json(req.body);
});
app.get('/loggedin', function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});


app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.listen('3000', function(){
	console.log('bekerja');
});