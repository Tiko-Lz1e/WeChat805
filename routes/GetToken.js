var express = require('express');
//wechat
var request = require('request');
var fs=require("fs");

var TokenFile = require('../Token.json');
var config = require('../config.json');


function GetAccessToken(){
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=';
    url += config.AppID;
    url += '&secret=';
    url += config.AppScrect;

    console.log(url);

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            var data = body;
            var result = JSON.parse(data);
            if (data.indexOf("errcode") < 0) {
                TokenFile.access_token = result.access_token;

                TokenFile.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;

                fs.readFile('../Token.json', 'utf8', function (err, AccessToken) {
                    AccessToken = JSON.stringify(TokenFile);
                    fs.writeFile('../Token.json', AccessToken, function (err, resu) {
                        if (err) console.log('error', err);
                    });
                });
            }
        }
    });
};


module.exports = {
  GetAccessToken
};
