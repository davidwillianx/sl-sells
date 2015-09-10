var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var User  = require('../../app/models/user');
var jsonWebToken = require('jsonwebtoken');
var mongoose = require('mongoose');


describe('User  url business',function(){
 var app;

  beforeEach(function(done){
    app = require('../../app');
    done();
  });	
  afterEach(function(done){
    User.remove().exec();
    app.close();
    done();
  });
  it('/user/connect - should receive jsonWebToken permission', function(done){
    postAccessRequestToken(app,function(error, res){
       should.not.exist.error;
	expect(res.body.success).to.be.true;
	should.not.exist(error);
	expect(res.body.token).to.not.be.undefined;
        done();
    });
  }); 
  it('/user/connect - should have exactly the same webtoken',function(done){
    var user = new User({email: 'test@te.com', password: 'testxx'})
    user.save(function(error){
       postAccessRequestToken(app,function(error, res){
	 var access = res.body;
	  should.not.exist(error);
	  expect(access.success).to.be.true;
	  var myToken = jsonWebToken.sign(user,process.env.APP_TOKEN_KEY); 
	  expect(splitSectionBeforeDot(myToken)).to.be.equal(splitSectionBeforeDot(access.token));
	  done();
      });
    });
  });
});

function postAccessRequestToken(app, cb){
  request(app)
  .post('/user/connect')
  .send({email: 'test@te.com' , password: 'testxx'})
  .expect('Content-Type', /json/)
  .expect(200)
  .end(cb);
}

function splitSectionBeforeDot(myToken){
  return myToken.split('.',2)[0];
} 
