var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var app = require('../../app');

describe('User  url business',function(){
  it('should acess to dashboard', function(done){
      request(app) 
      .post('/user/connect')
      .send({email: 'test@te.com', password: 'testxx'})
      .expect(302)
      .expect('Content-Type','text/html; charset=utf-8')
      .end(function(error,res){
        should.not.exist.error;
        expect(res.headers.location).to.equal('/user/dashboard');
        done(); 
      });
  }); 
});
