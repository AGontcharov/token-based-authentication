'use strict';

var jwt = require('jsonwebtoken');
var key = require('../../config.json').key;

module.exports = function(req, res, next) {

  // Check headers for Bearer scheme
  if (!(req.get('Authorization') && req.get('Authorization').split(' ')[0] === 'Bearer')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  // Get and verify token
  var token = req.get('Authorization').split(' ')[1];
  jwt.verify(token, key, function(err, decoded) {
    if (err) return res.status(401).json({ success: false, message: err.message });
    next();
  });
};