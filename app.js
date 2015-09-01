var express = require('express');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var homeRouter = require('./app/routes/home');
var productAPI = require('./app/routes/product');
var error = require('./app/routes/error');
require('dotenv').load();
var app = express();

/*app.set('view engine', 'ejs');
app.set('views',path.join( __dirname+'/app/client/views'));*/

mongoose.connect(process.env.MONGO_CONNECT);
require('./app/auth/passport')(passport);

app.use(session({
   name: process.env.SESSION_NAME,
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	urlencoded: true,
	extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname+'/app/client/'));

app.use('/',homeRouter);
require('./app/routes/user')(app,passport);
app.use('/product',productAPI);

app.use(error.index);

app.use(function(req, res, next){
 var error = new Error('Not found'); 
  error.status = 404;
  next(error);
});

if(app.get('evn') === 'development'){
  res.status(error.status || 500); 
  res.render('error',{
    message: error.message,
    error: error
  });
}

app.use(error.production);

var server = app.listen(8080,function(){
  console.log('Im working');
});

module.exports = server; 

