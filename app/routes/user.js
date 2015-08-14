var express = require('express');

module.exports = function(userRoute,passport){

 userRoute.post('/user/connect',passport.authenticate('local',{
     successRedirect: '/user/dashboard',
     failureRedirect: '/',
     failureFlash: true
  }));


  userRoute.get('/user/dashboard',isAuthenticated,function(req, res){
    res.render('dashboard');
  });
}; 


function isAuthenticated(req, res, next){
	if(req.isAuthenticated())
           return next();
        else res.redirect('/');
}

