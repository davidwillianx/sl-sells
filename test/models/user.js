var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
require('dotenv').load();
var User = require('../../app/models/user');

describe('UserSchema',function(){
   before(function(done){
     mongoose.connect(process.env.MONGO_CONNECT);
     done();
   }); 
   after(function(done){
     User.remove().exec();	   
     mongoose.connection.close();
     done();
   });
   it('should be a user schema',function(done){
       var user = new User();
       expect(user).to.be.an.instanceof(User);
       done();
   });	
   it('should save with no error',function(done){
      var user =  new User();
      user.local.email = 'testusr@user.com';
      user.local.password = 'imtestnotsurethatwillwork';
      user.save(function(error){
        should.not.exist(error);      
	expect(user._id).to.not.be.undefined;
	done();
      });
   });
   it('should have  encryptd password', function(done){
       var myPassWd = 'thisisMyAwesomePasswd';	    
       var user =  new User({
         local:{
	  email: 'testuser@test.com',
	  password: myPassWd 
	 }
       });
       user.save(function(error){
         should.not.exist(error);      
	 expect(user.local.password).to.not.equal(myPassWd);
	 done();
       });
   });
   it('should compare my password',function(done){
     var myPassWd = 'thisMyPasswod';	   
      var user = new User({
        local:{
	  email: 'thisemail@ts.com',
	  password: 'thisMyPasswod'
	}  
     });
     user.save(function(error){
       should.not.exist.error;
       user.compare(myPassWd,function(error,isMath){
          expect(isMath).to.be.true;
	  done();
       }); 
     });
   });
});



