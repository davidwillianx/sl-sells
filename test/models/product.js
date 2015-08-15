var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Product = require('../../app/models/product');
require('dotenv').load();

describe('ProductSchema',function(){
 var product = new Product({
   name: 'UnclePopCorn',
   brand: 'XochoCorn',
   quantity: 2,
   price: 14
 });	
 before(function(done){
   mongoose.connect(process.env.MONGO_CONNECT);	 
   Product.remove().exec();
   done();
 });	
 after(function(done){
    mongoose.connection.close();
    done();
 });
 afterEach(function(done){
    Product.remove().exec();
    done();
 });
 it('Should be and instance of product',function(done){
   var product = new Product();
   expect(product).to.be.an.instanceof(Product); 
   done();
 });
 it('Should persist item',function(done){
   product.save(function(error){
      should.not.exist(error);
      done();
    });  
 });
 it('Should exist _id',function(done){
   product.save(function(error){
     should.not.exist(error);
     expect(product._id).to.not.be.undefined;
     done();
   });
 });
 it('Should  have price',function(done){
    product.price = 29;	 
    product.save(function(error){
      should.not.exist(error);   
      expect(product.price).to.be.equal(29);
      done();
    });
 });
});
