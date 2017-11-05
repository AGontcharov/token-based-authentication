'use strict';

var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var key = require('../config.json').key;
var db = require('./database.js');
var auth = require('./middleware/authentication.js');

var router = express.Router();
const saltRounds = 10;

router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res) {
  return res.status(200).json({
    'version': 1.00
  });
});

router.use(function(req, res, next) {
  console.log(req.body);

  if (!req.body.username) return res.status(400).json({ success: false, message: 'Missing username' });
  if (!req.body.pwd) return res.status(400).json({ success: false, message: 'Missing password' });
  next();
});

router.post('/users', function(req, res) {

  // Hash the password with salt bcrypt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.pwd, salt, function(err, hash) {

      // Create User
      var args = [req.body.username, hash];
      db.query("INSERT INTO Users (username, password) VALUES (?, ?)", args, function(err, rows, fields) {
        if (err.errno === 1062) return res.status(404).json({ success: false, message: 'User already exists' });
        else throw err;

        // Create token
        var token = jwt.sign({ username: req.body.username }, key, { expiresIn: '10m' });
        return res.status(201).json({
          token: token
        });
      });
    });
  });
});

router.post('/login', function(req, res) {

  db.query("Select password FROM Users WHERE username=?", req.body.username, function(err, rows, fields) {
    if (err) throw err;

    if (!rows.length) return res.status(404).json({ success: false, message: 'Username or password is incorrect' });

    // Compare user password and hash
    bcrypt.compare(req.body.pwd, rows[0].password, function(err, result) {

      if (!result) return res.status(404).json({ success: false, message: 'Username or password is incorrect' });

      // Create token
      var token = jwt.sign({ username: req.body.username }, key, { expiresIn: '10m' });
      return res.status(200).json({
        token: token
      });
    });
  });
});

module.exports = router;