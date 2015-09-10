var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var UserService = require('../../app/services/user');
var User = require('../../app/models/user');

describe('UserService',function(){
  before(function(done){
     var userService = new UserService(); 
     mongoose.connect(process.env.MONGO_CONNECT);
     expect(userService).to.be.an.instanceof(UserService);
     done();
  });
  after(function(done){
    User.remove().exec();	  
    mongoose.connection.close();
    done();
  });
  it('#access - should not exist error ',function(done){
     var userService  = new UserService();  
     var email = 'tex33st@mail.com', password = 'tesx1243';
     userService.access(email, password,function(error, user){
      should.not.exist.error;
      done();
     });
  });  
  it('#access - should send user id',function(done){
     var userService = new UserService();
     var email = 'texsst@mail.com', password = 'tesx1243';

     userService.access(email,password,function(error,user){
       should.not.exist.error; 
       expect(user._id).to.not.be.undefined;
       done();
     });
  });
  it('#access - should has same id',function(done){
     var userService = new UserService();	  
     var user = new  User({
       local:{
         email : 'test@tesx.com',
	 password: 'tesxUpd'
       }
     }); 
     user.save(function(error){
        should.not.exist.error;
	userService.access('test@tesx.com','tesxUpd',function(error,userFromService){
          should.not.exist.error;
	  userFromService._id.should.not.be.undefined;
	  var el  = userFromService.local.password === user.local.password;
	  var idT = userFromService._id == user._id;
	  expect(userFromService.local.email).to.equal(user.local.email);
	  done();
	});
     });

  });
});
