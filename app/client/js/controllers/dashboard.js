angular.module('slsells')
.controller('DasboardController',
  ['$scope','ProductHttpReqApi','UserAuth',function($scope,ProductHttpReqApi,UserAuth){

  $scope.products = {};
  $scope.qName;
  $scope.isModalOpened = false;
  $scope.isShopCartOpened = false; 
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
 
  $scope.modalNewProduct = function(){
   var status =  $scope.isModalOpened;
   $scope.isModalOpened = (status == true) ? false : true;
  };  

  $scope.addProduct = function(product){
    ProductHttpReqApi.save(product)
    .then(function(apiData){
       $scope.loadProducts();
       $scope.modalNewProduct();
    });
  };

  $scope.logout = function(){
    UserAuth.logout(); 
  };

  $scope.toggleShopCart = function(){
    var status = $scope.isShopCartOpened;
    $scope.isShopCartOpened =  (status == true) ? false : true;
  };
}]);

