(function(){
	angular.module('Great', ['ui.router', 'ui.pagedown'])

	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/main/home');

		$stateProvider
		.state('main',{
			url : '/main',
			templateUrl : 'app/templates/main.html',
			controller : 'programCtrl'
		})
		.state('main.pendaftaran',{
			url : '/pendaftaran',
			templateUrl : 'app/templates/pendaftaran.html',
			controller : 'siswaCtrl'
		})
		.state('main.alumni',{
			url : '/alumni',
			templateUrl : 'app/templates/alumni.html',
			controller : 'alumniCtrl'
		})
		.state('main.home',{
			url : '/home',
			templateUrl : 'app/templates/home.html',
			controller : 'greatCtrl'
		})
		.state('main.tentanggreat',{
			url :'/tentanggreat',
			templateUrl : 'app/templates/tentanggreat.html',
			controller : 'programCtrl'
		})
      	.state('main.programbiaya',{
        	url : '/programbiaya',
         	templateUrl : 'app/templates/programbiaya.html',
         	controller : 'programCtrl'
      	})

      	.state('admin',{
			url : '/admin',
			templateUrl : 'app/templates/admin/admin.html',
			controller : 'adminCtrl',
			resolve : {
				loggedin : cekLoggedin
			}
		})
		.state('login',{
			url : '/login',
			templateUrl : 'app/templates/login.html',
			controller : 'loginCtrl'
		})
		.state('admin.pendaftar',{
			url : '/pendaftar',
			templateUrl : 'app/templates/admin/pendaftar.html',
			controller : 'siswaCtrl'
		})
		.state('admin.tampilanAwal',{
			url : '/tampilanAwal',
			templateUrl : 'app/templates/admin/tampilanAwal.html',
			controller : 'greatCtrl'
		})
		.state('admin.tentangGreat',{
			url : '/tentangGreat',
			templateUrl : 'app/templates/admin/tentangGreat.html',
			controller : 'greatCtrl'
		})
		.state('admin.programBiaya',{
			url : '/programBiaya',
			templateUrl : 'app/templates/admin/programBiaya.html',
			controller : 'programCtrl' 
		})
		.state('admin.tambahAdmin',{
			url : '/tambahAdmin',
			templateUrl : 'app/templates/admin/tambahAdmin.html',
			controller : 'adminCtrl'
		})
		.state('admin.alumni',{
			url:'/alumni',
			templateUrl : 'app/templates/admin/alumni.html',
			controller : 'alumniCtrl'
		})
	})
}());

function cekLoggedin($q,$http,$state,$rootScope){
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(user){
		if(user != "0"){
			$rootScope.currenUser = user;
			deferred.resolve();
		}else{
			$rootScope.currenUser = null;
			deferred.reject();
			$state.go('login');
		}
	});
	return deferred.promise;
}