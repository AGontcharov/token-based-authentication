'use strict';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var key = require('../config.json').key;
var db = require('./database.js');

const saltRounds = 10;

module.exports = {

  create: function(req, res) {

    if (!req.body.username) return res.status(400).json({ success: false, message: 'Missing username' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'Missing password' });

    // Check if user already exists
    db.query("SELECT username FROM Users where username=?", req.body.username, function(err, rows, fields) {
      if (err) throw err;

      if (rows.length) return res.status(409).json({ success: false, message: 'Username already exists' });

      // Hash the password with salt bcrypt
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          // Create User
          var args = [req.body.username, hash];
          db.query("INSERT INTO Users (username, password) VALUES (?, ?)", args, function(err, rows, fields) {

            if (err) throw err;

            // Create token
            var token = jwt.sign({ username: req.body.username }, key, { expiresIn: '10m' });
            res.cookie('access-token', token);
            return res.status(201).json({ success: true });
          });
        });
      });
    });
  },

  authenticate: function(req, res) {

    if (!req.body.username) return res.status(400).json({ success: false, message: 'Missing username' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'Missing password' });

    db.query("SELECT password FROM Users WHERE username=?", req.body.username, function(err, rows, fields) {
      if (err) throw err;

      // User not found
      if (!rows.length) return res.status(404).json({ success: false, message: 'Username or password is incorrect' });

      // Compare user password and hash
      bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
        if (!result) return res.status(404).json({ success: false, message: 'Username or password is incorrect' });

        // Create token
        var token = jwt.sign({ username: req.body.username }, key, { expiresIn: '10m' });        
        res.cookie('access-token', token);
        return res.status(200).json({ success: true });
      });
    });
  },

  get: function(req, res) {
    db.query("SELECT id, username FROM Users", function(err, rows, fields) {
      if (err) throw err;

      // No users found
      if (!rows.length) return res.status(404).json({ sucess: false, message: 'No users found' });
      return res.status(200).json({ success: true, users: rows });
    });
  }
};