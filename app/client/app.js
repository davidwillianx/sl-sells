 var slsells =  angular.module('slsells',['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: 'views/access.html',
	controller: 'AccessController',
	controllerAs: 'access'
      })
      .otherwise({redirectTo: '/'});
  });   


