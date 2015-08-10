var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

UserSchema = mongoose.Schema({
   local:{
    email: String,
    password : String
   }
});

UserSchema.pre('save',function(next){
	var user = this;
	bcrypt.genSalt(process.env.SALT_HASCODE,function(error,salt){
	  if(error) next(error); 
	  bcrypt.hash(user.local.password,salt,null,function(error,hash){
	  if(error) next(error);	  
	  user.local.password = hash;
	  next();
	  });
	});
   
});


UserSchema.methods.compare = function(password, cb){
    bcrypt.compare(password,this.local.password,function(error,isMath){
      if(error) cb(error);
      cb(null, isMath);  
    }); 
};

module.exports = mongoose.model('User',UserSchema); 
