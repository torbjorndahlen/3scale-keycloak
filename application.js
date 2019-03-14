var express = require('express');
var bodyParser = require('body-parser');

// create a new express server
var app = express();

// Keycloak
var session = require('express-session');

app.use(session({
  secret: 'b06e7a82-e11e-4531-812b-01a0c3ebdf5c',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var Keycloak = require('keycloak-connect');

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Create a json body parser for POST requests
var jsonParser = bodyParser.json({limit: '50mb'});
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

// Start server
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date().toLocaleString() + " on " + host + ":" + port);
});




//
// ping
//
app.get('/api/ping', function (req, res) {

		console.log('\n\n===========REQUEST===============');
		console.log('\n\nGET /api/ping');

    res.statusCode = 200;
    res.json('pong');

    console.log('\n\n=========REQUEST END===============');
});

//
// unprotected resource
//
app.get('/api/public', function (req, res) {

  console.log('\n\n===========REQUEST===============');
  console.log('\n\nGET /api/public');

  res.statusCode = 200;
  res.json('OK');

  console.log('\n\n=========REQUEST END===============');
});

//
// protected resource
//
app.get('/api/protected', keycloak.protect(), function (req, res) {

		console.log('\n\n===========REQUEST===============');
		console.log('\n\nGET /api/protected');
    console.log('\n\nAuthorization: ' + req.get('Authorization'));

    res.statusCode = 200;
    res.json('OK');

    console.log('\n\n=========REQUEST END===============');
});


module.exports = app;
