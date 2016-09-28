var salaApp = angular.module("salaDeJuegosApp", ['ui.router', 'angularFileUpload', 'satellizer']);

salaApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	$authProvider.loginUrl = 'SalaDeJuegos/servidor/jwt/php/auth.php';
	$authProvider.tokenName = 'SalaDeJuegosToken';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authHeader = 'data';

	$authProvider.github({
	clientID: '5d8c7d10a65e7bc96e92',
	  url: '/usuario/login',
	  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
	  redirectUri: window.location.origin,
	  optionalUrlParams: ['scope'],
	  scope: ['user:email'],
	  scopeDelimiter: ' ',
	  oauthType: '2.0',
	  popupOptions: { width: 1020, height: 618 }
	});


	$stateProvider
		.state(
			"persona", {
				url: '/persona',
				abstract: true,
				templateUrl: 'templates/persona/persona.html'
			})
		.state(
			"persona.menu", {
				url: '/menu',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-menu.html',
						controller: 'PersonaMenuCtrl'
					}
				}
			})
		.state(
			"persona.alta", {
				cache:false,
				url: '/alta',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-alta.html',
						controller: 'PersonaAltaCtrl'
					}
				}
			})
		.state(
			"persona.grilla", {
				url: '/grilla',
				views:{
					"content": {
						templateUrl: 'templates/persona/persona-grilla.html',
						controller: 'PersonaGrillaCtrl'
					}
				}
			})
		.state(
			"usuario", {
				url: '/usuario',
				abstract: true,
				templateUrl: 'templates/usuario/usuario.html'
			})

		.state(
			"usuario.login", {
				url: '/login',
				views:{
					"content": {
						templateUrl: 'templates/usuario/login.html',
						controller: 'LoginCtrl'
					}
				}
			})

		.state(
			"usuario.signin", {
				url: '/signin',
				views:{
					"content": {
						templateUrl: 'templates/usuario/signin.html',
						controller: 'SigninCtrl'
					}
				}
			})

		
		$urlRouterProvider.otherwise("/persona/menu");
		
});

salaApp.controller("PersonaMenuCtrl", function($scope, $state){
	$scope.irAAlta = function(){
		$state.go('persona.alta');
	}

	$scope.irAGrilla = function(){
		$state.go('persona.grilla');
	}
});

salaApp.controller("PersonaAltaCtrl", function($scope, $state, FileUploader, $http){
	$scope.SubidorDeArchivos = new FileUploader({url:'servidor/Archivos.php'});
	$scope.SubidorDeArchivos.onSuccessItem = function(item, response, status, headers){

	}

	 // FILTERS

        $scope.SubidorDeArchivos.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        $scope.SubidorDeArchivos.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $scope.SubidorDeArchivos.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        $scope.SubidorDeArchivos.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        $scope.SubidorDeArchivos.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        $scope.SubidorDeArchivos.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $scope.SubidorDeArchivos.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        $scope.SubidorDeArchivos.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $scope.SubidorDeArchivos.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.SubidorDeArchivos.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.SubidorDeArchivos.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $scope.SubidorDeArchivos.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', $scope.SubidorDeArchivos);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
});

salaApp.controller("PersonaGrillaCtrl", function($scope){
	$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];
});

salaApp.controller("LoginCtrl", function($scope, $auth){
	 $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
});

salaApp.controller("SigninCtrl", function($scope){
	
})