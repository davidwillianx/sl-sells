var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');

var app;

describe('routes', function(){
   beforeEach(function(done){
     app = require('../app');   
     done();
   });
   afterEach(function(done){
     app.close(); 
     done();
   });
   it('/ - should answer as html home page',function(done){
	request(app)
	.get('/')
	.expect(200)
	.expect('Content-Type','text/html; charset=UTF-8')
	.end(done);
   });
   it('/ whatever should receive 404 error', function(done){
      request(app)
      .get('/turtule')
      .expect(404)
      .end(done);
   });

});



