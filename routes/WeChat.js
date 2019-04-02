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
var pics = ['stBEFudMK9Unn2euiY4xYvTdRnpV7XfNsHbMEyZAsnTxJ6lSZQJRMQXEs0HZoBdN',
            'C8MBMQ5GNXsQdy0Y5DucRsryOJczxp2TmBZ8ayvlXJ6qF3WDeV502Ge4r_BTJoxW',
            'gA0rBAlMLNDrudr-2jYDZhgMozAKZlHb80LfwJ3AyR6H4pl3D815rmAI75mH-Caq',
            ];

router.all('/', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    var content='公众号功能更新中';

    switch(message.Content){
        case "课程表":
            res.reply({
                type: "image",
                content: {
                    mediaId: 'xotx8ge9KFo44o10hUQ8PmMr_9wrVpomh7sZYyfWpuJ8ORn0gEeVwO0epmTqzH5U'
                }
            });
            break;
        case "沙雕图":
            res.reply({
                type: "image",
                content: {
                    mediaId: pics[Math.floor(Math.random()*pics.length)]
                }
            });
            break;
        case "作业":
            content = rf.readFileSync("public/text/homework","utf-8");
            res.reply(content);
            break;
        case "作业1":
            content = rf.readFileSync("public/text/homework1","utf-8");
            res.reply(content);
            break;
        case "帮助":
            content = rf.readFileSync("public/text/help","utf-8");
            res.reply(content);
            break;
        case "后端代码":
            content = 'https://github.com/Twx1213/WeChat805';
            res.reply(content);
            break;
        default:
            res.reply(content);
    }
}));

module.exports = router;
