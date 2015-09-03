angular.module('slsells').controller('DasboardController',['$scope','ProductHttpReqApi',function($scope,ProductHttpReqApi){
  $scope.products = {};
  $scope.qName;

  $scope.addProduct = function(){
    console.log('We are going to add');  
  };
 
  $scope.loadProducts  = function(){
    ProductHttpReqApi.searchAll().then(function(apiData){
      $scope.products = apiData.data.products;
    },function(error){ console.log(error)});
  };
  
  $scope.loadProducts();

  $scope.$watch('qName',function(){
    ProductHttpReqApi.searchByName($scope.qName)
    .then(function(apiData){
       $scope.products = apiData.data.products;  
    });
  });


}]);

