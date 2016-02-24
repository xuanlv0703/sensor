var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var routes = require('./routes/index');
var users = require('./routes/users');




var app = express();

//  OpenShift sample Node application
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3002;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.get('/', function (req, res) {
    res.send('abc');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
//end config

