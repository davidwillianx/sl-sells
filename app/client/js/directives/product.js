angular.module('slsells')
.directive('product',function(){
  return {
    restrict: 'EA',
    templateUrl: 'views/product/show.html',
    replace: true,
    scope: {
     data:'=' 
    }
  };
});
