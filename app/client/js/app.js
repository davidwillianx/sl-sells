angular.module('slsells',[])
.controller('AccessController',['$http', function($http){
  var accessController = this;
  this.sigin = function(user){
    $http.post('/user/connect',{ data: user})
    .success(function(data){
      console.log('success', data);
    })
    .error(function(error){
      console.log('error');
    });  
  };
}]);
