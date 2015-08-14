var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function(passport){
  
   passport.serializeUser(function(user,done){
      done(null,user.id);
   });	

   passport.deserializeUser(function(id, done){
      User.findById(id,function(error){
        done(error,user);
      });
   });


   passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
   },function(req,email,password,done){
         if(!req.user){
	    User.findOne({'local.email': req.body.email},function(error, user){
	      if(error) done(error);
	      if(user){
	       user.compare(req.body.password,
	         function(error,isMath){
	           if(error) done(error);
		   if(isMath)
		     done(null,user);	  
  	           else done(new Error('email or password are not ok'));
  	         });
	      }else{
	         var newUser = new User({
		      local:{
		        email: req.body.email,
			password: req.body.password
		      } 
	         });      

		 newUser.save(function(erro){
		   if(error) throw error;
		   done(null, newUser);
		 });
	      }
	    });
	 } 
      }
   ));
};


