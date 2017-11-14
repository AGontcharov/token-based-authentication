'use strict';

var express = require('express');
var auth = require('./middleware/authentication.js');
var users = require('./users.js');

var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res) {
  return res.status(200).json({ 'version': 1.00 });
});

router.get('/users', users.get);
router.post('/users', users.create);
router.post('/login', users.authenticate);

router.get('/protected', auth, function(req, res) {
  return res.status(200).json({ message: 'Accessing restricted' });
});

module.exports = router;