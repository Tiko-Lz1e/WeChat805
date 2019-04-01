var express = require('express');
var router = express.Router();
//wechat
var configs = require('../config');
var wechat = require('wechat');
var rf=require("fs");

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
    var content='公众号功能更新中';

    if(message.Content === "课程表"){
        res.reply({
            type: "image",
            content: {
                mediaId: 'xotx8ge9KFo44o10hUQ8PmMr_9wrVpomh7sZYyfWpuJ8ORn0gEeVwO0epmTqzH5U'
            }
        });
    }else if(message.Content === "作业"){
        content = rf.readFileSync("public/text/homework","utf-8");
        res.reply(content);
    }else if(message.Content === "作业1"){
        content = rf.readFileSync("public/text/homework1","utf-8");
        res.reply(content);
    }else if(message.Content === "帮助"){
        content = rf.readFileSync("public/text/help","utf-8");
        res.reply(content);
    }else if(message.Content === "后端代码"){
        content = 'https://github.com/Twx1213/WeChat805';
        res.reply(content);
    }else{
        res.reply(content);
    }
}));

module.exports = router;
