/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
require('http').createServer(function(req, res) {
if ( typeof mongodb !== 'undefined' && mongodb ) {
// Perform CRUD operations through REST APIs
if(req.method == 'POST') {
insert_records(req,res);
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

