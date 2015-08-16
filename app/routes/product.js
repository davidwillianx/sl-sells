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


module.exports = productAPI;
