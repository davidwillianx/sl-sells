angular.module('slsells')
.directive('modalnewproduct',function(){
  return {
    restrict: 'EA',
    templateUrl: 'views/product/new.html',
    replace: true

  };
});
