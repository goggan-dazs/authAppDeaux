var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();
const isValidToken = require("../middleware/isValidToken");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register');
});


/* GET profile page */
router.get('/profile', isValidToken, function(req, res, next) {
  res.render('profile');
});




module.exports = router;
