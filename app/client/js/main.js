(function(){
  var search = document.getElementById('productSearch'); 
  var gridProduct = document.getElementById('grid-product');
  var loadElm = document.getElementById('load');
  var  add = document.getElementById('add');
  var modalNewProduct = document.getElementById('box-new-product');
  var btNewProduct = document.getElementById('setNewProduct');  
  var newProduct = '';

  search.focus();
  search.onkeydown = function(e){
    if(search.value){
       $.ajax({
        url: '/product/'+search.value,  
	dataType: 'json',
	method: 'GET',
	beforeSend: function(){
	  loadElm.classList.add('is-active');
	}
       })
       .success(function(data){
	 if(data.products.length !== 0 ) loadData(data,gridProduct);
	 else gridProduct.innerHTML = 'Nada encontrado';
       })
       .fail(function(reason){
         console.log('Error',reason);
       });
    }   
  }
 
  add.onclick = function(e){
   modalNewProduct.classList.toggle('new-item-active');
  }
  
 btNewProduct.onclick = function(e){
   e.preventDefault();
    newProduct = {
      name : document.getElementById('pname').value,
      brand: document.getElementById('bname').value,
      quantity: document.getElementById('qt').value,
      price: document.getElementById('price').value
   };

   console.log(newProduct);
   $.ajax({
      url: '/product/',
      method: 'POST',
      dataType: 'json',
      data:newProduct
   })
   .success(function(response){
      console.log('SUCCESS', response);
   })
   .fail(function(error){
      console.log('ERROR', error);
   });
 }

}
)();

function loadData(data,gridProduct){
      for(var index = 0 ; index <data.products.length ; index++){
	gridProduct.innerHTML = '<div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp" ><div class="mdl-card__media"><img src="/imgs/dog.png" alt=""></div><div class="mdl-card__title"><h4 class="mld-card__title-text">'+data.products[0].name+'</h4></div><div class="mdl-card__supporting-text">this bautiful dog</div><div class="mdl-card__actions">comprar |adicionar</div></div>';
 }
}
