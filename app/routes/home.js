var express  = require('express');
var homeRouter = express.Router();
var rootPath = require('app-root-path');

homeRouter.get('/',function(req, res){
  res.sendFile(rootPath+'/app/client/views/index.html');
});


module.exports = homeRouter;
