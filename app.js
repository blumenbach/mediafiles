var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === 'foo' && user.pass === 'bar') {
        return next();
    } else {
        return unauthorized(res);
    }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', require('./lib/rest-client.js')({
//    staticFiles : 'resources/media',
//    urlRoot : 'media',
//    title : 'Blumenbach Sammlung',
//    render : false
//}), function(req, res, next){
//    return res.render('media', { galleryHtml : req.html });
//});
app.use('/users', users);
app.use('/', require('./lib/gallery.js')({
    staticFiles : 'resources/media',
    urlRoot : '/',
    title : 'Blumenbach Sammlung',
    render : false
}), auth, function(req, res, next){
  return res.render('media', { galleryHtml : req.html });
});

port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3001;
host = process.env.OPENSHIFT_NODEJS_IP;
app.listen(port, host);
host = host || 'localhost';
console.log('mediafiles listening on ' + host  + ':' + port);

module.exports = app;
