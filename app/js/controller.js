(function(){
	angular.module('Great')
	.controller('adminCtrl', function($scope, $http, $state){
		$scope.logout = function(){
			$http.post('/logout').success(function(){
				$state.go('main.home');
			})
		}

		var refreash = function(){
			$http.get('/admin/tampil').success(function(respon){
				$scope.admins = respon;
			})
		}

		refreash();

		$scope.bukaModal = function(){
			$scope.tampil=true;
			$scope.admin={};
			$scope.sukses=false;
		}

		$scope.tambahAdmin = function(admin){
			$http.post('/admin/tambah', admin).success(function(respon){
				refreash();
				$scope.admin = {};
				$scope.informasi = "Data admin baru berhasil ditambah";
				$scope.sukses = true;
			}).error(function(err){
				
			})
		}

		$scope.editadmin = function(id){
			$scope.tampil=false;
			$scope.sukses=false;
			$http.get('/admin/edit/'+ id).success(function(respon){
				$scope.admin = respon;
			})
		}
		$scope.updateadmin = function(admin){
			$http.put('/admin/update/'+ $scope.admin._id, admin).success(function(){
				refreash();
				$scope.informasi = "Data admin berhasil diubah";
				$scope.sukses = true;
				$scope.admin={};
			})
		}

		$scope.del = function(id){
			$scope.iddel = id;
			$scope.sukses = false;
		}
		$scope.hapus = function(){
			$http.delete('/admin/hapus/'+ $scope.iddel).success(function(){
				refreash();
				$scope.informasi = "Data admin berhasil dihapus";
				$scope.sukses = true;
			})
		}
	})

	//==================================================================================

	.controller('greatCtrl', function($scope, $state, $http, $rootScope){
		var tampil = function(){
			$http.get('/tampilan/tampil').success(function(respon){
				$scope.gambars = respon;
			})
		}



		tampil(); 

		$scope.tambahtampilan = function(){
			$http.post('/tampilan/tambah', $scope.data).success(function(respon){
				tampil();
			})
		}
		
		$scope.edittampilan = function(id){
			$http.get('/tampilan/edit/'+ id).success(function(respon){
				$scope.data = respon;
			})
		}		

		$scope.updatetampilan = function(){
			console.log($scope.data._id);
			$http.put('/tampilan/update/'+ $scope.data._id, $scope.data).success(function(respon){
				tampil();
				$scope.data={};
			})
		}
		$scope.data = {};
		var fileSelec = document.createElement('input');
		fileSelec.type = 'file';
		$scope.pilih1 = function(){
			fileSelec.click();
		}
		fileSelec.onchange = function() {
			var f = fileSelec.files[0], r = new FileReader();
			r.onloadend = function(e) {
				$scope.data.gambar = e.target.result;
				$scope.$apply();
				console.log($scope.data.gambar);
			}
			r.readAsDataURL(f); 
		}

		var tampilGreat = function(){
			$http.get('/great/tampil').success(function(respon){
				$scope.greats = respon;
			})
		}

		tampilGreat();

		$scope.tambahgreat = function(){
			$http.post('/great/tambah', $scope.doc).success(function(respon){
				$scope.editGreat = false;
				tampilGreat();
			})
		}
		$scope.bukamodal = function(){
			$scope.editGreat = true;
		}
		$scope.editgreat = function(id){
			$http.get('/great/edit/'+ id).success(function(respon){
				$scope.doc = respon;
				$scope.editGreat = true;
			})
		}

		$scope.updategreat = function(){
			$http.put('/great/update/'+ $scope.doc._id, $scope.doc).success(function(respon){
				$scope.doc={};
				tampilGreat();
				$scope.editGreat = false;
			})
		}
		$scope.keluar = function(){
			$scope.editGreat = false;
		}

		//pilih gambar mengubah gambar menjadi string
		$scope.doc = {};
		var fileSelect = document.createElement('input');
		fileSelect.type = 'file';
		$scope.pilih = function(){
			fileSelect.click();
		}
		fileSelect.onchange = function() {
			var f = fileSelect.files[0], r = new FileReader();
			r.onloadend = function(e) {
				$scope.doc.gambar = e.target.result;
				$scope.$apply();
			}
			r.readAsDataURL(f); 
		}
	})

	//==================================================================================

	.controller('programCtrl', function($scope, $state, $http, $rootScope,$location, $anchorScroll){
		var tampilGreat = function(){
			$http.get('/great/tampil').success(function(respon){
				$scope.greats = respon;
			})
		}
		tampilGreat();
		//Sintax untuk pergi ke bawah
		$scope.gotoBottom = function() {
	      // set the location.hash to the id of
	      // the element you wish to scroll to.
	      $location.hash('tentanggreat');
	      
	      // call $anchorScroll()
	      $anchorScroll();
	    };

		$scope.lihatgreat = function(id){
			$http.get('/great/edit/'+ id).success(function(respon){
				$state.go('main.tentanggreat');
				$scope.data = respon;
			})
		}

		$scope.tambah = function(){
			$scope.tampil = true;
			$scope.tampilubah = false;
		}

		$scope.kembali = function(){
			$scope.tampil = false;
			$scope.data = {};
		}

		var refreashProgram = function(){
			$http.get('/program/tampil').success(function(respon){
				$scope.programs = respon;
			})
		}

		refreashProgram();

		$scope.tambahProgram = function(data){
			$http.post('/program/tambah', $scope.data).success(function(respon){
				$scope.tampil = false;
				$scope.data = {};
				refreashProgram();
			})
		}

		$scope.hapusProgram = function(id){
			$http.delete('/program/hapus/'+id).success(function(respon){
				refreashProgram();
			})
		}
		$scope.editProgram = function(id){
			$scope.tampilubah = true;
			$http.get('/program/edit/'+id).success(function(respon){
				$scope.data = respon;
				$scope.tampil = true;
			})
		}
		$scope.updateProgram = function(){
			$http.put('/program/update/'+ $scope.data._id , $scope.data).success(function(respon){
				$scope.data = {};
				$scope.tampil = false;
				refreashProgram();
			})
		}
		$scope.tam = function(id){
			$scope.idpak = id;
			$scope.macam = {};
			$scope.buka = false;
			$scope.sukses=false;
		}
		$scope.tambahMacam = function(){
			$http.post('/program/tambahMacam/'+ $scope.idpak, $scope.macam).success(function(respon){
				$scope.macam = {};
				refreashProgram();
				$scope.sukses=true;
				$scope.informasi="paket berhasil ditambah";
			})
		}
		$scope.getMacam = function(id, idsub){
			$scope.buka = true;
			$scope.sukses=false;
			$http.get('/program/getMacam/'+ id +'/'+ idsub).success(function(respon){
				$rootScope.idbar = respon._id;
				$scope.macam = respon.macamProgram[0];
			})
		}
		$scope.updateMacam = function(){
			$http.put('/program/updateMacam/'+$rootScope.idbar+'/'+$scope.macam._id ,  $scope.macam)
			.success(function(respon){
				$scope.macam = {};
				refreashProgram();
				$scope.sukses=true;
				$scope.informasi="paket berhasil diubah";
			})
		}
		$scope.hapusMacam = function(id, idsub){
			$http.delete('/program/deleteMacam/'+ id +'/'+ idsub).success(function(respon){
				refreashProgram();
			})
		}

		$scope.lihatProgram = function(id){
			$http.get('/program/edit/'+id).success(function(respon){
				$state.go('main.programbiaya');
				$scope.data = respon;
			})
		}
		$scope.kePandaftaran = function(){
			$state.go('main.pendaftaran');
		}
	})

	//==================================================================================

	.controller('loginCtrl', function($scope, $state, $http, $rootScope){
		$scope.doLogin = function(login){
			$http.post('/api/login', login).success(function(respon){
				$rootScope.currenUser = respon;
				$scope.login = {};
				$state.go('admin');
			}).error(function(error){
				$scope.salah = true;
			})
		}
	})

	//==================================================================================

	.controller('siswaCtrl', function($scope, $http, $state){
		var tampilmurid = function(){
			$http.get('/murid/tampil').success(function(respon){
				$scope.murids = respon;
			})
		}
		
		tampilmurid();

		$http.get('/program/tampil').success(function(respon){
			$scope.programs = respon;
		})

		$scope.paket = true;

		$scope.tampilpaket = function(nama){
			$http.get('/murid/getprogram/'+nama).success(function(respon){
				$scope.datas = respon;
				$scope.paket = false;
			})
		}

		$scope.daftarSiswa = function(){
			$scope.murid.status = "belum";
			$http.post('/murid/tambah', $scope.murid).success(function(respon){
				$scope.sukses = true;
				$scope.murid = {};
				$scope.paket = true;
			})
		}
		$scope.lihatTelpon = function(siswa){
			$scope.siswa = siswa;
			$http.put('/murid/status/'+ siswa._id, siswa).success(function(respon){
				tampilmurid();
			})
		}
		$scope.lengkapnya = function(id){
			$http.get('/murid/getmurid/'+id).success(function(respon){
				$scope.data = respon;
				$http.put('/murid/status/'+ id, $scope.siswa).success(function(respon){
					tampilmurid();
				})
			})
		}
		$scope.hapusMurid = function(id){
			$http.delete('/murid/hapus/'+id).success(function(respon){
				tampilmurid();
			})
		}
		$scope.tes = function(){
			$scope.sukses = false;
		}
	})

	//==================================================================================

	.controller('alumniCtrl', function($http, $scope, $state){
		$scope.tambahAlumni = function(){
			$http.post('/alumni/tambah', $scope.alumni).success(function(respon){
				$scope.alumni = {};
				$scope.alumni.foto = {};
				$scope.sukses = true;
				$scope.informasi = "data alumni berhasil diubah";
				tampilAlumni();
			})
		}
		var tampilAlumni = function(){
			$http.get('/alumni/getAlumni').success(function(respon){
				$scope.alumnis = respon;
			})
		}
		tampilAlumni();

		$scope.getAlumni = function(id){
			$scope.buka = true;
			$http.get('/alumni/getAlumni/'+ id).success(function(respon){
				$scope.alumni = respon;
			})
		}
		$scope.updateAlumni = function(){
			$http.put('/alumni/updateAlumni/'+$scope.alumni._id, $scope.alumni).success(function(respon){
				$scope.sukses = true;
				$scope.informasi = "data alumni berhasil diubah";
				tampilAlumni();
			})
		}
		$scope.hapusAlumni = function(id){
			$http.delete('/alumni/hapusAlumni/'+id).success(function(respon){
				tampilAlumni();
			})
		}

		$scope.bukaModal = function(){
			$scope.buka = false;
			$scope.alumni={};
			$scope.alumni.foto = {};
			$scope.sukses=false;
		}
		$scope.hilang = function(){
			$scope.sukses = false;
		}

		$scope.alumni = {};
		var fileSelect = document.createElement('input');
		fileSelect.type = 'file';
		$scope.pilih = function(){
			fileSelect.click();
		}
		fileSelect.onchange = function() {
			var f = fileSelect.files[0], r = new FileReader();
			r.onloadend = function(e) {
				$scope.alumni.foto = e.target.result;
				$scope.$apply();
			}
			r.readAsDataURL(f); 
		}
	})

}())