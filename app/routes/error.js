var express  = require('express');
var errorRouter = express.Router();


exports.index = function(req, res, next){
   var error = new Error('Not Found');
   error.status = 404;
   next(error);
};

exports.production  = function(req, res){
  res.status(error.status || 500);
  res.render('error',{
    message: error.message,
    error: {}
  });
};
