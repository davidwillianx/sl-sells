var express = require('express');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').load();
var app = express();

app.set('view engine', 'ejs');
app.set('views',path.join( __dirname+'/app/views'));

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


require('./app/routes/user')(passport);
app.use('/',function(req, res){
  res.render('index');
});

app.listen(8080,function(){
  console.log('Im working');
});

module.exports = app;

