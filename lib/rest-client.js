var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    cache = require('memory-cache'),
    im = require('imagemagick-stream'),
    common;

module.exports = function(config) {
    var app = express(),
        staticFiles = config.staticFiles,
        common = require('./common')(config),
        album = require('./album')(config),
        photo = require('./photo')(config);
    var Client = require('node-rest-client').Client;

    var client = new Client();

    var response = client.get("http://localhost:8080/fcrepo/rest/blumenbach/000001/media", function (data, response) {
        console.log(data);
        console.log(response);

    });
    
    app.get("http://localhost:8080/fcrepo/rest/blumenbach/000001/media");
    return app;
};
