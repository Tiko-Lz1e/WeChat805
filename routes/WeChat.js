var express = require('express');
var router = express.Router();
//wechat
var configs = require('../config');
var wechat = require('wechat');

//crypto
var crypto = require('crypto');
var config = {
    appid: configs.AppID,
    token: configs.Token,
    encodingAESKey: configs.EncodingAESKey,
    checkSignature: false
};

router.all('/', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    res.reply('公众号架构更新中');
}));

module.exports = router;
