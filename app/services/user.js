var User = require('../models/user');

function UserService(){};

UserService.prototype.access = function(email, password, cb){
    User.findOne({'local.email': email},function(error,userFound){
       if(error) cb(error); 
       if(userFound){
          userFound.compare(password,function(error,isMath){
	    if(error) cb(error);
	    if(isMath)
              cb(null,userFound);
            else cb(new Error('email or password did not match'));
	  });      
       }else{
	 persistence(email, password, cb);      
       }
    });	
};


function persistence(email,password,cb){
   var newUser = new User({
     local:{
       email: email,
       password: password
     }
   });
   newUser.save(function(error){
     if(error) cb(error);
     cb(null,newUser);
   });
}


module.exports = UserService;
