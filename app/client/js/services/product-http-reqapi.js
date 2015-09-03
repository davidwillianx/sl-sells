angular.module('slsells').factory('ProductHttpReqApi',
  ['$http',function($http){
     return {
        searchAll: function(){
           return $http.get('/product');	
	},

	searchByName: function(guessName){
           return $http.get('/product',{
	     params:{
	      productname: guessName
	     }
	   }); 	
	}
     };
  }]);
