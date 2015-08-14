var Product = require('../models/product');

function ProductService(){}

ProductService.prototype.register = function(productMap,cb){
   if(isNotAcceptableStructure(productMap))
	   return cb(new Error('Data not corresponding to a product structure'));
   var product = new Product(productMap);

      product.save(function(error){
        if(error) cb(error);
	cb(null);
      });
};

ProductService.prototype.find = function(query,cb){
    if(isNotAcceptableStructure(query))
       return  cb(new Error('Invalid query structure'));	    
    Product.find(query,function(error, products){
      if(error) cb(error);    
      cb(null,products);
    });
};
 
function isNotAcceptableStructure(data){
  return typeof  data !== 'object';
}

module.exports = ProductService;
