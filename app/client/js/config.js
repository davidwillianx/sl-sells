angular.module('slsells',['ngRoute','ngMaterial','ngMdIcons'])
 .config(['$httpProvider',function($httpProvider){
   $httpProvider.interceptors.push('authInterceptor');
 }])
 .config(['$locationProvider',function($locationProvider){
    $locationProvider.html5Mode({enable: true, requireBase: false })
    .hashPrefix(""); 
 }])
 .config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'views/access.html',
      controller: 'AccessController',
      controllerAs: 'access'
    })
    .when('/dashboard',{
      templateUrl: 'views/dashboard.html',
      controller: 'DasboardController',
      controllerAs: 'dash',
      access: {
       requiredLogin: true 
      }
    })
    .otherwise({redirectTo: '/'});
 }]);

 angular.module('slsells')
 .run([
   '$rootScope',
   '$window',
   '$location',
   'AuthenticationFactory'
 ,function($rootScope,$window,$location,AuthenticationFactory){
  
   AuthenticationFactory.check();  

   $rootScope.$on('$routeChangeStart',
      function(event, nextRoute, currentRoute){
         if((nextRoute.access && 
	     nextRoute.access.requiredLogin) && 
	    !AuthenticationFactory.isLogged){
          $location.path('/'); 
       }
   });

   $rootScope.$on('$routeChangeSuccess',function(event, nextRoute, currentRoute){
     if(AuthenticationFactory.isLogged  && $location.path() == '/')
         $location.path('/dashboard');
   });
 }]);
