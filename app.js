require('dotenv').load(); // Load all env vars from .env

var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./api/models/db'); // Mongoose

var apiRoutes = require('./api/routes/index');

var app = express();
app.use(compression());

var fs = require('fs');
var path = require('path');

var projectdata = {
  "portfolio":{}
};

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
console.log(getDirectories('./public/assets/portfolio/'));

projectdata.portfolio['characters'] = 5;
projectdata.portfolio['environments'] = 'hello';
console.log('object: ' + projectdata.portfolio.characters);

/*
 var traverseFileSystem = function (currentPath) {
    console.log(currentPath);

    var files = fs.readdirSync(currentPath);
    for (var i in files) {
       var currentFile = currentPath + '/' + files[i];
       var stats = fs.statSync(currentFile);

       // We have a file!
       if (stats.isFile()) {
         console.log('file: ' + path.basename(currentFile));
         var directories = path.dirname(currentFile);
         directories = directories.replace('.', '');
         directoryList = directories.split('/');
         var finalDirectories = [];
         for(var q in directoryList){
           if(directoryList[q] !== '' && directoryList[q] !== 'public' && directoryList[q] !== 'assets' && directoryList[q] !== 'portfolio'){
             finalDirectories.push(directoryList[q]);
           }
         }

         console.log('filePath: ' + finalDirectories);
         var parent = 'portfolio';
         for(var j in finalDirectories){
           projectdata[parent][finalDirectories[j]] = {};
           parent = finalDirectories[j];
         }
         console.log('data afterupdate ' + projectdata);

       }
      else if (stats.isDirectory()) {
        traverseFileSystem(currentFile);
      }
   }
 };
traverseFileSystem('./public/assets/portfolio/');
*/

// view engine setup
//app.set('views', path.join(__dirname, 'app_server', 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') !== 'production') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// API
app.use('/api', apiRoutes); // These routes will use the authentication above.

// API 404
app.use(function(req, res, next) {
  res.status(200);
  // If this is an api route that wasn't handled in /api above, throw error.
  if(req.originalUrl.indexOf("/api") !== -1){
    // No need to create full error to display since this is only relevant to the API.
    // Client will be redirected to Angular app (as expected for bad route).
    res.status(404);
  }

  next();
});

//app.use(express.static(path.join(__dirname, 'public')));
var oneMonth = 2592000;
app.use(express.static(path.join(__dirname, 'dist'), {
  etag: true,
  maxage: oneMonth
}));

// Serve our app to the browser. The Express static function will automatically
// default to any file called 'index'. So our angular index template is defaulted
// to without routing.
// All errors must be handled from Angular from here.
app.use('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// error handlers -- if shit has absolutely hit the fan and we get here.

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
