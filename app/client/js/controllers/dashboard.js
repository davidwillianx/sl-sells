angular.module('slsells').controller('DasboardController',['$scope','$http',function($scope,$http){
  $scope.products = {};

  $scope.addProduct = function(){
    console.log('We are going to add');  
  };
 
  $scope.loadProducts  = function(){
   $http.get('/product')
     .then(function(apiData){
        console.log(apiData); 
     });
  };

  $scope.loadProducts();

}]);

