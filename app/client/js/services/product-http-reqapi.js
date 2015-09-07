angular.module('slsells')
.factory('ProductHttpReqApi',
  ['$http',function($http){
   return {
      searchAll: function(){
	 return $http.get('/product');	
      },

      searchByName: function(productName){
	 return $http.get('/product',{
	   params:{
	    productname: productName
	   }
	 }); 	
      },
     
      save: function(product){
	return $http.post('/product',product);
      }
   };
}]);
