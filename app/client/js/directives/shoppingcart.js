angular.module('slsells')
.directive('shoppingcart',function(){
   return {
    restrict: 'EA',
    templateUrl: 'views/product/cart.html',
    replace: true,
    scope: {
      data:'='
    }
   };
});
