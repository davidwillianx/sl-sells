var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
     name: {type : String, required: true},
     brand: {type: String, required: true},
     quantity: {type: Number, required: true},
     price: {type : Number , required: true} 
   });


module.exports = mongoose.model('Product',ProductSchema); 
