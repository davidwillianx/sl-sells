angular.module('slsells')
.controller('AccessController',['$window','$location','$http','$scope',
	    'UserAuth','AuthenticationFactory',
	    function($window,$location,$http,$scope,UserAuth,AuthenticationFactory){
  $scope.user = {};

  $scope.sigin = function(user){
     if(user.email && user.password){
        UserAuth.login(user.email, user.password)
	.then(function(access){
	  AuthenticationFactory.isLogged = true;
	  $window.sessionStorage.token = access.data.token; 
          $location.path('/dashboard');
	},function(error){
	  console.log('May Something happend in a wrong way');
	});
     }else console.log('No valid credentials');     
  };  
}]);
