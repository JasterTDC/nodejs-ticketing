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
        fsr       = require('file-stream-rotator'),
        logDirectory = __dirname + '/log',
        favicon   = require ('serve-favicon'),
        Twig      = require('twig'),
        app       = express();

/**
 * DB Connection
 **/
mongoose.connect(database.mongo);

/**
 * Api definition
 **/
 var accessLogStream = fsr.getStream({
   date_format: 'YYYYMMDD',
   filename: logDirectory + '/access-%DATE%.log',
   frequency: 'daily',
   verbose: false
 })

app.set('twig options', {
  strict_variables: false
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyPar.urlencoded({'extended':'true'}));
app.use(bodyPar.json());
app.use(bodyPar.json({ type: 'application/vnd.api+json' }));
app.use(methodOv('X-HTTP-Method-Override'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('views', __dirname + '/public/views');

/**
 * Routes section
 **/
require('./routes/ticket.js')(app);
require('./routes/main.js')(app);

/**
 * Starting server
 **/
app.listen (port)
console.log ("Listening on port: " + port);
