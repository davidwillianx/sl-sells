angular.module('slsells').factory('authInterceptor',['$q','$window',function($q,$window){
    return {
      request: function (config){
	config.headers  = config.headers || {};
	if($window.sessionStorage.token){
           config.headers['x-access-auth-slselltk'] = $window.sessionStorage.token; 	
           config.headers['Content-Type'] = 'application/json';

	}
	return config || $q.when(config);
      },

      response: function(response){
        return response || $q.when(response); 
      }
   };
}]);

