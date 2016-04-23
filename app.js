/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , userlist = require('./routes/userlist')
  , newuser = require('./routes/newuser')
  , adduser = require('./routes/adduser')
  , changeuser = require('./routes/changeuser')
  , updateuser = require('./routes/updateuser')
  , remuser = require('./routes/remuser')
  , deleteuser = require('./routes/deleteuser')
  , http = require('http')
  , path = require('path');

var mongodb = require('mongodb');

var port = (process.env.VCAP_APP_PORT || 1337);
var host = (process.env.VCAP_APP_HOST || '0.0.0.0');

var app = express();
app.configure(function(){
app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Invoke the appropriate Express middleware
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', routes.index);
app.get('/userlist', userlist.list);
app.get('/newuser', newuser.list);
app.post('/adduser',adduser.list);
app.get('/changeuser', changeuser.list);
app.post('/updateuser', updateuser.list);
app.get('/remuser', remuser.list);
app.post('/deleteuser',deleteuser.list);


if (process.env.VCAP_SERVICES) {
	  var env = JSON.parse(process.env.VCAP_SERVICES);
	  if (env['mongodb-2.2']) {
		var mongo = env['mongodb-2.2'][0]['credentials'];
	  }
	} else {
		   var mongo = {
		      "username" : "user1",
		      "password" : "secret",
		      "url" : "mongodb://user1:secret@localhost:27017/test"
	 }
}
// Set our internal DB variable
var mycallback = function(err,results) {
    console.log("mycallback");
    if(err) throw err;
};

var MongoClient = mongodb.MongoClient;
var db= MongoClient.connect(mongo.url, function(err, db) {
  if(err) {
    console.log("failed to connect to the database");
  } else {
    console.log("connected to database");
  }
}); 

//Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db; // Does not seem to be used
  next();
});

// Create Web server and listen on port 1337
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
 
  if (process.env.VCAP_SERVICES) {
	  var env = JSON.parse(process.env.VCAP_SERVICES);
	  if (env['mongodb-2.2']) {
		var mongo = env['mongodb-2.2'][0]['credentials'];
	  }
	} else {
		   var mongo = {
		      "username" : "han308",
		      "password" : "11OE4444",
		      "url" : "mongodb://<user>:<password>@aws-us-east-1-portal.16.dblayer.com:10299,aws-us-east-1-portal.15.dblayer.com:10286/Trails"
	 }
}

var mycallback = function(err,results) {
    console.log("mycallback");
    if(err) throw err;
};
// Setup connection to DB
var MongoClient = mongodb.MongoClient;
var db= MongoClient.connect(mongo.url, function(err, db) {
  if(err) {
    console.log("failed to connect to the database");
  } else {
    console.log("connected to database");
  }
  var collection = db.collection('Score');
  
  //Clear DB and insert 3 records
  collection.remove(mycallback);
  var user1 = { "FirstName" : "Tinniam", "LastName" : "Ganesh","Mobile": "916732177728" };
  var user2 = { "FirstName" : "Darth", "LastName" : "Vader","Mobile": "6666699999" };
  var user3 = { "FirstName" : "Bill", "LastName" : "Shakespeare","Mobile": "8342189991" };
  collection.insert(user1,function(err,result){});
  collection.insert(user2,function(err,result){});
  collection.insert(user3,function(err,result){});
  collection.find().toArray(function(err, items) {
  	
  }); 
 }); 
});