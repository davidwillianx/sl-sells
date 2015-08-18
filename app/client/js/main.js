(function(){
  var search = document.getElementById('productSearch'); 
  search.onkeydown = function(e){
    if(e.keyCode === 13){
       $.ajax({
        url: '/product',  
	dataType: 'json',
       }).success(function(data){
         console.log('Success',data);
       }).fail(function(reason){
         console.log('Error',reason);
       });
    }
  }
}
)();
