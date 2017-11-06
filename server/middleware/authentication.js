'use strict';

var jwt = require('jsonwebtoken');
var key = require('../../config.json').key;

module.exports = function(req, res, next) {

  if (!req.body.token) return res.status(401).json({ success: false, message: 'No token provided' });
  var token = req.body.token;

  jwt.verify(token, key, function(err, decoded) {
    if (err) return res.status(401).json({ success: false, message: err.message });

    next();
  });
};