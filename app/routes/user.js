var express = require('express');
var userRoute = express.Router();

module.exports = function(passport){
  userRoute.post('/connect',function(req, res){
    if(req.body.email && req.body.password)	
      res.redirect('/user/dashboard');
    else res.render('index');   
  });

  userRoute.get('/dashboard',function(req, res){
    res.render('dashboard');
  });
} 

