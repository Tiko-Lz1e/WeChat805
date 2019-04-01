var express = require('express');
var router = express.Router();
//wechat
var config = require('../config');
var wechat = require('wechat');

//crypto
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Totally new life');

});

module.exports = router;
