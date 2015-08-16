var expect = require('chai').expect;
var should  = require('chai').should();
var mongoose = require('mongoose');
var Product = require('../../app/models/product');
var ProductService = require('../../app/services/product');
require('dotenv').load();

describe('ProductService',function(){
  var  productService; 	
  before(function(done){
   mongoose.connect(process.env.MONGO_CONNECT); 
   Product.remove().exec();
   done();
  });
  after(function(done){
    mongoose.connection.close();
    done();
  });
  beforeEach(function(done){
    productService = new ProductService();
    done();
  });
  afterEach(function(done){
    Product.remove().exec(); 
    done();
  });
  it('Should be an instanceof',function(done){
     expect(productService).to.be.an.instanceof(ProductService);
     done();
  });
  it('#register - exist',function(done){
      var name = 'MangoS',brand = 'MangoStore', quantity = 2, price= 12;
      productService.register({
        name: name,
	brand: brand,
	quantity: quantity,
	price: price
      },function(error){
        should.not.exist(error);
	done();
      });  
  });
  it('#register - should persist Product', function(done){
     saveMockProducts(function(error){
       var product = {
          name: 'Master Master Candie',
	  brand: 'MMC',
	  quantity: 44,
	  price: 22
       };	     
       productService.register(product,function(error){
	 should.not.exist(error);      
         Product.find({},function(errorService,products){
           should.not.exist(error);	   
            expect(products.length).to.be.equal(5);
           done();
         });
       });
      });
  });
  it('#register - not able to persist with no required fields',function(done){
      productService.register(42,function(error){
        should.exist(error); 
	Product.find({},function(error, products){
             expect(products.length).to.equal(0);	
	     done();
	});
      });     
  });
  it('#find - exist',function(done){
      var query = {
	      brand : 'Alicat'
      };
      productService.find(query,function(error, products){
        should.not.exist(error);
	done();
      });
  });
  it('#find - 2 products ', function(done){
     saveMockProducts( 
       function(error){
       should.not.exist(error);
       var query = {
         name: /Mistery/
       };
       productService.find(query,function(error, products){
          should.not.exist(error);       
	  expect(products.length).to.be.equal(3);
	  done();
       });
     });
  });
  it('#find - products  with same brand and simillar names',function(done){
     saveMockProducts(function(error){
        should.not.exist(error);
	var query = {
	  name : /Mistery/,
	  brand: 'Syxt'
	};
       productService.find(query,function(error,products){
         should.not.exist(error); 
	 expect(products.length).to.equal(2);
	 done();
       }); 
     });   
  });
  it('#find - no products cause we have no brand found',function(done){
       saveMockProducts(function(error){
      	  should.not.exist(error); 
	  productService.find({
	     name: /Mistery/,
	     brand: 'holulu'
	  },function(error,products){
	    should.not.exist(error); 
	    expect(products.length).to.equal(0);
	    done();
	  });
       });  
  });
  it('#find - send error to not a good query param',function(done){
    saveMockProducts(function(error){
  	should.not.exist(error);   
	productService.find('Weird query',function(error,products){
	    should.not.exist(products);
            should.exist(error);	
	    done();
	});
    }); 
  });
  it('#find - send erro to also not accept number as query',function(done){
      saveMockProducts(function(error){
          should.not.exist(error);      
	  productService.find(42,function(error, products){
	      should.not.exist(products); 
	      should.exist(error); 
	      done();
	  }); 
      }); 
  });
  it('#find - find price 33 got 2 itens ',function(done){
     saveMockProducts(function(error){
       should.not.exist(error);	
       productService.find({
          price: 33
       },function(error,products){
       should.not.exist(error); 
         expect(products.length).to.be.equal(2);
         done();
       });
     }); 
  });
  it('#find - no products for price 10',function(done){
     saveMockProducts(function(error){
       should.not.exist(error);
       productService.find({
         price: 10
       },function(error,products){
         should.not.exist(error); 
	 expect(products.length).to.equal(0);
	 done();
       });
     }); 
  });
  it('#find - only products which price is > 23',function(done){
     saveMockProducts(function(error){
        should.not.exist(error);
	productService.find({
	  price:{ $gt: 23}  
	},function(error,products){
           should.not.exist(error);	
	   expect(products.length).to.be.equal(3);
	   done();
	});
     }); 
  });
});

function saveMockProducts(cb){
  Product.create({
    name: 'Mistery Os Age',
    brand: 'Syxt',
    quantity : 2,
    price: 23
  },{
    name: 'Selfish board',
    brand: 'SelfTech',
    quantity: 22,
    price: 33
  	},{
     name: 'Mistery of Ancient',
     brand: 'Syxt',
    quantity: 5,
    price: 24
 },{
    name: 'Mistery of Machines',
    brand: 'SelfTech',
    quantity: 200,
    price: 33
 },cb);
}
