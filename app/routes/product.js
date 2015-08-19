var express = require('express');
var productAPI = express.Router();
var ProductService = require('../services/product');

productAPI.post('/',function(req, res){
    var productService = new ProductService();
    productService.register(req.body,function(error){
      if(error)
	  res.json({success: false , message: error.message});      
      else
       res.json({success: true, message: 'Product persistence success'});    
    });
});

productAPI.get('/:productname',function(req, res){
  if(req.params.productname){
     var productService = new  ProductService();
     productService.find({name:{$regex : new RegExp(req.params.productname,'i') }  },function(error, products){
          if(error) res.json({success: false, message: error.message});       
	  res.json({success: true, products: products});
     });
  }  
});

module.exports = productAPI;
