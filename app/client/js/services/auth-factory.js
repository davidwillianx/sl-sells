angular.module('slsells').factory(
  'AuthenticationFactory',
  ['$window',function($window){
  return {
     isLogged: false,
     check: function(){
       if($window.sessionStorage.token)
	 this.isLogged = true;
     }
   };
}]);
