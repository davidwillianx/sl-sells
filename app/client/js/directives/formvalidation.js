angular.module('slsells')
.directive('mailvalid',function(){
   var MAIL_PATTERN = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

   return {
     require: 'ngModel',
     restrict: '',
     link: function(scope, elem, atts, ctrl){
       if(ctrl && ctrl.$validators.email){
	 console.log('Working');
         ctrl.$validators.email = function(modelMail){
	   return ctrl.$isEmpty || MAIL_PATTERN.test(modelMail);
	 };
       } 
     }
   };

});
