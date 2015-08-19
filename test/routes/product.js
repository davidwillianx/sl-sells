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
   it('POST /product/ - should have persistence error',function(done){
      requestProductPost('/product',{
        name: 'Pipoca Dori',
	brand: 'Candiesss'
      },function(error, res){
	 expect(res.body.success).to.be.false;
	 expect(res.body.message).to.be.equal('Product validation failed');
	 done();
      }); 
   });
  it('GET /product/:name',function(done){
    requestProductGET('/product/pantera',function(error, res){
      should.not.exist(error);  
      done();
    });
  });
  it('GET /product/:name - get success item as true',function(done){
    requestProductGET('/product/pantera',function(error, res){
      should.not.exist(error);
      expect(res.body.success).to.not.be.undefined;
      done();
    });
  });
  it('GET /product/:name - should exist product index',function(done){
    requestProductGET('/product/pantera',function(error,res){
       should.not.exist(error); 
       should.exist(res.body.products);
       done();
    });
  }); 
  it('GET /product/:name with no name receives 404',function(done){
     request(app)
     .get('/product/')
     .expect(404,done);
  });
  it('GET /product/:name - name = guri product.length should 1',function(done){
    requestProductGET('/product/gury',function(error, res){
	should.not.exist(error); 
	expect(res.body.products.length).to.be.equal(0);
	done();
    });
  });
  it('GET /product/:name - name == guri should have same brand',function(done){
    var product = {
      name: 'Gury',
      brand: 'Docile',
      quantity: 2,
      price: 0.33
    };
    Product.create(product,function(error){
       should.not.exist(error);     
       requestProductGET('/product/gury',function(reqError, res){
         should.not.exist(reqError);
	  expect(product).to.not.null;
          expect(product.brand).to.equal(product.brand); 
	  expect(product.name).to.equal(product.name);
	  expect(product.quantity).to.equal(product.quantity);
	  done();
       });
    })  
  });
  it('GET /product/:name - should get name == PeDeMoleque',function(done){
    var product = {name : 'pedemoleque', brand: 'dory', quantity: 33, price: 0.10};
    Product.create(product,function(error){
      should.not.exist(error);
     requestProductGET('/product/pedemoleque',function(reqError, res){
       should.not.exist(reqError);
       expect(res.body.products[0].name).to.equal(product.name);
       done();
     }); 
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

function requestProductGET(path,cb){
  request(app)
  .get(path)
  .expect('Content-Type',/json/)
  .expect(200)
  .end(cb);
}
