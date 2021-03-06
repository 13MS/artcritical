var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var debug = require('debug')('artcritical-list:server');
var enforce = require('express-sslify');

var expressValidator = require('express-validator');

//Authentification
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Get the User Atuhentification model
require('./config/passport')(passport);

var app = express();

//Force HTTPS
if ( process.env.BASE_URI !== 'http://localhost:5000'){
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// MongoDB
var mongoose = require("mongoose");
var url = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are in!');
});

// Import the Mongoose models
var ListModels = require('./models/list.js');
var List = ListModels.list;
var Archive = ListModels.archive;
var Trash = ListModels.trash;
var EventModels = require('./models/event.js');
var EventSchema = EventModels.event;
var EventTrash = EventModels.archive;
var EventArchive = EventModels.trash;
var ArtistModels = require('./models/artist.js');
var Artist = ArtistModels.artist;
var ArtistTrash = ArtistModels.artistTrash;
var Venue = require('./models/venue.js');
var UserModels = require('./models/user.js');
var User = UserModels.user;
var UserTrash = UserModels.userTrash;
var Feature = require('./models/feature.js');
var Ads = require('./models/ad.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Create sessions
var maxAge = 7 * 24 * 3600 * 1000;
app.use(session({ 
    secret: 'woot', 
    cookie:{maxAge: maxAge},
    resave: false,
    saveUninitialized: true
}));

//start authentitification
app.use(passport.initialize());
app.use(passport.session());


//Setup flash messages
app.use(flash());
app.use(function(req, res, next) {
  res.locals.message = req.flash();
  next();
});


//Pre-Rendering for SEO
app.use(require('prerender-node').set('prerenderToken', 'xNgryV1QDytdnXWxSjza'));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.list = List;
    req.archive = Archive;
    req.trash = Trash;
    req.event = EventSchema;
    req.eventTrash = EventTrash;
    req.eventArchive = EventArchive;
    req.artists = Artist;
    req.artistTrash = ArtistTrash;
    req.venue = Venue;
    req.userlist = User;
    req.usertrash = UserTrash;
    req.feature = Feature;
    req.ads = Ads;
    next();
});

var index = require('./routes/index');
var venues = require('./routes/venues');
var listings = require('./routes/list');
var event = require('./routes/event');
var artists = require('./routes/artist');
var auth = require('./routes/auth');
var ads = require('./routes/ads');

app.use('/venues', venues);
app.use('/list', listings);
app.use('/event', event);
app.use('/artist', artists);
app.use('/auth', auth);
app.use('/ads', ads);
app.use('/', index);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 5000;
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

