/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
/*
var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;
var conn_str = "";
if (mongo) {
  var env = JSON.parse(mongo);
  if (env['mongodb-2.4']) {
    mongo = env['mongodb-2.4'][0]['credentials'];
    if (mongo.url) {
      conn_str = mongo.url;
    } else {
      console.log("No mongo found");
    }  
  } else {
    conn_str = 'mongodb://localhost:27017';
  }
} else {
  conn_str = 'mongodb://localhost:27017';

require('http').createServer(function(req, res) {
if ( typeof mongodb !== 'undefined' && mongodb ) {
// Perform CRUD operations through REST APIs
if(req.method == 'POST') {
insert_records(req,res);
>>>>>>> origin/master
}
else if(req.method == 'GET') {
list_records(req,res);
}
else if(req.method == 'PUT') {
update_records(req,res);
}
else if(req.method == 'DELETE') {
delete_record(req,res);
}
} else {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.write("No MongoDB service instance is bound.\n");
res.end();
}
}).listen(port, host);

<<<<<<< HEAD
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.write('Two APIs are provided: "/api/insertMessage" and "/api/render"' + "\n"
    + 'When "/api/insertMessage" is called, messages will be written to database' + "\n"
    + 'When "/api/render" is called, the inserted message will be shown');
  res.end();
});

app.get('/api/insertMessage', function (req, res) {
  var message = { 'message': 'Hello, Bluemix', 'ts': new Date() };
  if (db && db !== "null" && db !== "undefined") {
    db.collection('messages').insert(message, {safe:true}, function(err){
      if (err) { 
        console.log(err.stack);
        res.write('mongodb message insert failed');
        res.end(); 
      } else {
        res.write('following messages has been inserted into database' + "\n" 
        + JSON.stringify(message));
        res.end();
      }
    });    
  } else {
    res.write('No mongo found');
    res.end();
  } 
});

app.get('/api/render', function (req, res) {
  if (db && db !== "null" && db !== "undefined") {
    // list messages
    db.collection('messages').find({}, {limit:10, sort:[['_id', 'desc']]}, function(err, cursor) {
      if (err) {
        console.log(err.stack); 
        res.write('mongodb message list failed');
        res.end();
      } else {
        cursor.toArray(function(err, items) {
          if (err) {
            console.log(err.stack); 
            res.write('mongodb cursor to array failed');
            res.end();
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            for (i=0; i < items.length; i++) {
              res.write(JSON.stringify(items[i]) + "\n");
            }
            res.end();
          }
        });
      }
    });     
  } else {
    res.write('No mongo found');
    res.end();  
  }
});
app.listen(port);
*/

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
/*
var MONGODB_URL='mongodb://han308:11OE4444@aws-us-east-1-portal.16.dblayer.com:10299/Trails';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var options = {
    mongos: {
        ssl: true,
        sslValidate: false,
    }
}

MongoClient.connect(process.env.MONGODB_URL, options, function(err, db) {
    assert.equal(null, err);
    db.listCollections({}).toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
        db.close();
        process.exit(0);
    })
});
*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://han308:11OE4444@aws-us-east-1-portal.16.dblayer.com:10299/Trails';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

/*
var MONGODB_URL="mongodb://han308:11OE4444@aws-us-east-1-portal.16.dblayer.com:10299/Trails"

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var options = {
    mongos: {
        ssl: true,
        sslValidate: false,
    }
}

MongoClient.connect(process.env.MONGODB_URL, options, function(err, db) {
    assert.equal(null, err);
    db.listCollections({}).toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
        db.close();
        process.exit(0);
    })
});
*/

// Let's open that connection
//mongoose.connect(process.env.MONGODB_URL, options);
/*
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect('mongodb://han308:11OE4444@aws-us-east-1-portal.16.dblayer.com:10299/Trails');
*/