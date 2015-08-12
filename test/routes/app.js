var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');

describe('routes', function(){
   it('/ - should answer as html home page',function(done){
	request(app)
	.get('/')
	.expect(200)
	.expect('Content-type','text/html; charset=utf-8')
	.end(done);
   });
   it('/user/connect - should\'n acess to dashboard',function(done){
      request(app)
      .post('/user/connect')
      .expect('Content-type','text/html charset=utf-8')
      .expect(302)
      .end(function(error, res){
         should.not.exist.error;
	 done();
      });
   });
   it('/ whatever should receive 404 error', function(done){
      request(app)
      .get('/turtule')
      .expect(404)
      .end(done);
   });
});



