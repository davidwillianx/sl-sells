var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var User  = require('../../app/models/user');
var app = require('../../app');

describe('User  url business',function(){
  before(function(done){
    User.remove().exec(); 
    done();
  });	
  afterEach(function(done){
    User.remove().exec();
    done();
  });
  it('/user/connect - should acess to dashboard', function(done){
      request(app) 
      .post('/user/connect')
      .send({email: 'test@te.com', password: 'testxx'})
      .expect(302)
      .expect('Content-Type','text/plain;  charset=utf-8')
      .end(function(error,res){
	      console.log('ERROR',error);
	      console.log('RESP',res.headers.location);
        should.not.exist.error;
        expect(res.headers.location).to.equal('/user/dashboard');
        done(); 
      });
  }); 
});
