/**
 * Declaration
 **/
var     express   = require('express'),
        database  = require('./config/database.js'),
        morgan    = require('morgan'),
        port      = 2559,
        bodyPar   = require('body-parser'),
        methodOv  = require('method-override'),
        mongoose  = require('mongoose'),
        app       = express();

/**
 * DB Connection
 **/
mongoose.connect(database.url);

/**
 * Api definition
 **/
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyPar.urlencoded({'extended':'true'}));
app.use(bodyPar.json());
app.use(bodyPar.json({ type: 'application/vnd.api+json' }));
app.use(methodOv('X-HTTP-Method-Override'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Routes section.

/**
 * Starting server
 **/
app.listen (port)
console.log ("Listening on port: " + port);
