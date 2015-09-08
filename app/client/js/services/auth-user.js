angular.module('slsells')
.factory('UserAuth',[
  '$window',
  '$location',
  '$http',
  'AuthenticationFactory'
  ,function($window, $location, $http,AuthenticationFactory){
  return {
    login: function(username, password){
      return $http.post('/user/connect',{
	email: username,
	password: password
      });	
    },
    logout: function(){
      if(AuthenticationFactory.isLogged){
        delete $window.sessionStorage.token;
	AuthenticationFactory.isLogged = false;
	$location.path("/");     
      } 
    }
  };
}]);
