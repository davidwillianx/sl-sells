angular.module('slsells',['ngRoute'])
 .config(['$httpProvider',function($httpProvider){
   $httpProvider.interceptors.push('authInterceptor');
 }])
 .config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'views/access.html',
      controller: 'AccessController',
      controllerAs: 'access'
    })
    .when('/dashboard',{
      templateUrl: '',
      controller: 'DasboardController',
      controllerAs: 'dash',
      access: {
       requiredLogin: true 
      }
    })
    .otherwise({redirectTo: '/'});
 });



  
