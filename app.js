var mysql = require('mysql');
var express = require('express');
require('dotenv').config();
var app = express();

app.set("port", process.env.PORT || 4000);
var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  // console.log(connection);
  
  console.log('Connected to database.Update node mon test');
  connection.query('USE lungeDatabase;');
  
app.get('/login/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "This is GET method." }
  connection.query("SELECT * FROM user", function (err, result, fields) {
    if (err) {
        console.error('table error: ' + err);
        return;
      }
    console.log(result);
  res.end(JSON.stringify(result));

  });
  // console.log(response);
  // res.end(JSON.stringify(result));
})
app.get('/fortest/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "This is GET method." }
  connection.query("SELECT * FROM user", function (err, result, fields) {
    if (err) {
        console.error('table error: ' + err);
        return;
      }
    console.log(result);
  res.end(JSON.stringify(result));

  });
  // console.log(response);
  // res.end(JSON.stringify(result));
})

app.get('/:fName', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "This is GET method with id=" + req.params.fName + "." }
  connection.query("SELECT * FROM user WHERE `fName`='"+ req.params.fName + "'", function (err, result, fields) {
    if (err) {
      console.log("SELECT * FROM user WHERE `fName`='"+ req.params.fName + "")
        // console.error('table error: ' + err);
        return;
      }
    res.end(JSON.stringify(result));
  });
  // console.log(response); 
})

app.post('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  var response = { "response" : "This is POST method." }
  console.log(req);
  res.end(JSON.stringify(response));
})

app.put('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "This is PUT method." }
  console.log(response);
  res.end(JSON.stringify(response));
})

app.delete('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var response = { "response" : "This is DELETE method." }
  console.log(response);
  res.end(JSON.stringify(response));
})

var server = app.listen(app.get("port"), function () {

 var host = server.address().address
 var port = server.address().port

 console.log("Node.js API app listening at http://%s:%s", host, port)

})
  
});

// connection.end();