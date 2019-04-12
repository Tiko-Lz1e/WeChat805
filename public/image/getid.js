var express = require('express');
//wechat
var request = require('request');
var fs=require("fs");

var TokenFile = require('../../Token.json');
var config = require('../../config.json');
var imageidFile = require('./imageId');
var GetToken = require('../../routes/GetToken');


function GetImageId(filename){
    var currentTime = new Date().getTime();
    if(TokenFile.access_token === "" || TokenFile.expires_time < currentTime){
        GetToken.GetAccessToken();
    }

    var Iurl = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=' + TokenFile.access_token + '&type=image';

    var formData = {
        my_file: fs.createReadStream(__dirname + '/' + filename + '.jpg')
    };

    request.post({
        url: Iurl,
        formData: formData,
    }, function(error, response, body){
        console.log(body);
        var result = JSON.parse(body);
        if (body.indexOf("errcode") < 0) {
            imageidFile[filename]["imageID"] = result.media_id;
            imageidFile[filename]["time"] = new Date().getTime() + 48 * 3600 * 1000;
            console.log(body);
            fs.readFile('./imageId.json', 'utf8', function (err, imageid) {
                imageid = JSON.stringify(imageidFile);
                fs.writeFile('./imageId.json', imageid, function (err, resu) {
                    if (err) console.log('error', err);
                });
            });
        }
    });
}


module.exports = {
    GetImageId
};
