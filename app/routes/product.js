var express = require('express');
var productAPI = express.Router();
var ProductService = require('../services/product');
var jsonWebToken = require('jsonwebtoken');

productAPI.use(function(req, res , next){
  var userToken = req.body.token || req.params.token || req.headers['x-access-auth-slselltk'];
  if(userToken)
    jsonWebToken.verify(userToken, process.env.APP_TOKEN_KEY,function(error,user){
       if(error) res.status(401).json({success: failure, message: 'Authetication failure' });
       else {
         res.user = user;
	 next();
       }   
    });
 else res.status(403).json({success: false, message: 'No token provided'});
});

productAPI.post('/',function(req, res){
    var productService = new ProductService();

    productService.register(req.body,function(error){
      if(error)
	  res.json({success: false , message: error.message});      
      else
       res.json({success: true, message: 'Product persistence success'});    
    });
});

productAPI.get('/:productname?',function(req, res){
  var query = {};
  var productService = new  ProductService();
  console.log('VALUE', req.params);
  if(req.params.productname){
     var likeClause = new RegExp(req.params.productname, 'i');
     query = {name: likeClause};
     console.log('VALEPARAM', req.params.productname);
  }

   productService.find(query,function(error, products){
	if(error) res.json({success: false, message: error.message});       
	res.json({success: true, products: products});
   });
});


module.exports = productAPI;
