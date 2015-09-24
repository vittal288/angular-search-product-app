//load dependcies
var express = require('express');
var app = express();
var path = require('path');
//***********************************
//client code configuration
//make this folder to public because it has to run on the browser and this folder contains the index page
var _clientPath = path.join(__dirname+"/client/ui");
var _adminPath = path.join(__dirname+"/client/ui/admin");
app.use(express.static(_clientPath));
app.use(express.static(path.join(__dirname+"/bower_components/")));





// for admin panel
app.get('/admin',function(req,res){
  //console.log('Load Admin Module');
  res.send(_adminPath);
});

//not allowed for rest of URL
app.get('/*',function(req,res){
  console.log('NOT allowed');
  res.send('Method not allowed')
});





//define rest_api router
app.use(require('./server/rest_api/rest_api'));

//create server
app.listen(9000, function (err) {
    if (err) throw err;
    console.log('REST API IS RUNNING on 9000');
});
