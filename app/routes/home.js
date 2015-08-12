var express  = require('express');
var homeRouter = express.Router();


homeRouter.get('/',function(req, res){
   res.render('index');
});


module.exports = homeRouter;
