var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/media', require('./lib/gallery.js')({
    staticFiles : 'resources/media',
    urlRoot : 'media',
    title : 'Blumenbach Sammlung',
    render : false
}), function(req, res, next){
  return res.render('media', { galleryHtml : req.html });
});

port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3001;
host = process.env.OPENSHIFT_NODEJS_IP;
app.listen(port, host);
host = host || 'localhost';
console.log('mediafiles listening on ' + host  + ':' + port);

module.exports = app;
