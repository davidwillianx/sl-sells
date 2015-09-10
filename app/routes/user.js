var express = require('express');
var jsonWebToken = require('jsonwebtoken');

module.exports = function(userRoute,passport){

 userRoute.post('/user/connect',
     passport.authenticate('local'),
     function(req, res){
       var token = jsonWebToken.sign(req.user,process.env.APP_TOKEN_KEY);
	  res.json({success : true , token : token});	
  });

  function isAuthenticated(req, res, next){
	  if(req.isAuthenticated())
	     return next();
	  else res.redirect('/');
  }
};

