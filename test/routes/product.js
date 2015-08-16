var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest');
var app  = require('../../app');
var Product = require('../../app/models/product');


describe('Product API',function(){
  after(function(done){
     Product.remove().exec(); 
     done();
  });	
  it('POST /product/',function(done){
     requestProductPost('/product',null, function(error, res){
        should.not.exist(error); 
        expect(res.body.success).to.be.false;
        done();
     });	  
  });
  it('POST /product/ - should have message product', function(done){
      requestProductPost('/product',null, function(error, res){
         should.not.exist(error);
	 expect(res.body.success).to.be.false;
	 /*expect(res.body.message).to.be.equal('Persistence failure');*/
	 done();
      });	  
  });
  it('POST /product/ - should have Product persisted',function(done){
     requestProductPost('/product',{
        name: 'Pipoca Dori',
	brand: 'Candiesss',
	quantity: 12,
	price: 0.33
      },function(error, res){
       should.not.exist(error);
         res.body.success.should.be.true;
	 Product.find({},function(error, products){
	   should.not.exist(error); 
	   expect(products.length).to.equal(1);
	   expect(products[0].name).to.be.equal('Pipoca Dori');
	   done();
	 }); 
     });	  
   });
   it('POST /product/ - should have persistence error',function(error){
      requestProductPost('/product',{
        name: 'Pipoca Dori',
	brand: 'Candiesss'
      },function(error, res){
         should.exist(error);
	 done();
      }); 
   });
});

function requestProductPost(path,data,cb){
  var path = path || '/product';	
  request(app)
  .post(path)
  .send(data)
  .expect('Content-Type',/json/)
  .expect(200)
  .end(cb);
}


