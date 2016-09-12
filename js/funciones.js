var salaApp = angular.module("salaDeJuegosApp", ['ui.router']);

salaApp.config(function($stateProvider, $urlRouterProvider){
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

salaApp.controller("PersonaAltaCtrl", function($scope){

});

salaApp.controller("PersonaGrillaCtrl", function($scope){
	$scope.personas = [
	{"nombre": "Ramiro",
	"apellido": "Torres",
	"email": "ramiro.torres@gmail.com",
	"edad": 30,
	"sexo": "masculino"}];
});

