'use strict';

var express = require('express');
var auth = require('./middleware/authentication.js');

var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res) {
  return res.status(200).json({
    'version': 1.00
  });
});

router.post('/users', function(req, res) {
  console.log(req.body);
  
});

router.post('/login', function(req, res) {

});

module.exports = router;