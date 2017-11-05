'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var router = require('./server/routes.js');

var app = express();
var port = process.env.PORT || 3000;

// Allow CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Parse incoming body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server static content
app.use(express.static('./public'));

// Load the api router
app.use('/api/v1', router);

// Serves the index file on any get request
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Create HTTP server
app.listen(port, function() {
  console.log('Server listening on port:', port);
});