(function(){
  var search = document.getElementById('productSearch'); 
  var gridProduct = document.getElementById('grid-product');

  search.focus();
  search.onkeydown = function(e){
    if(e.keyCode === 13){
       $.ajax({
        url: '/product/'+search.value,  
	dataType: 'json',
	method: 'GET'
       }).success(function(data){
	 console.log(data);
            for(var index = 0 ; index <data.products.length ; index++){
	      console.log('Loop');
	      gridProduct.innerHTML = '<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp" ><div class="mdl-card__media"><img src="/imgs/dog.png" alt=""></div><div class="mdl-card__title"><h4 class="mld-card__title-text">'+data.products[0].name+'</h4></div><div class="mdl-card__supporting-text">this bautiful dog</div><div class="mdl-card__actions">comprar |adicionar</div></div>';

	    }
       }).fail(function(reason){
         console.log('Error',reason);
       });
    }
  }
}
)();
