const express = require('express');
const app = express();
const port = 3000;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

var testMessage = {"message":["test", false]};

MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
  if (err) throw err;

  db = client.db();
  db.collection('messages').deleteMany();
  client.close();
});

app.all('*', function(req, res, next){
  if (req.method != "GET"){
    res.status(405).send("HTTP 405: Method not allowed")
  }else{
    next();
  }
})

app.get('/getall', function (req, res) {
  MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
    if (err) throw err;

    db = client.db();
    db.collection('messages').find().toArray(function (err, result) {
      if (err) throw err;

      res.status(200);
      res.json(result);
    });
    client.close();
  });
});


app.get('/save', function (req, res) {

  var message = req.query.message;
  
  if (message == undefined){
    res.status(400).send("HTTP 400: Parameter invalid or missing")
  }
  else if (message.length > 140 || message.length < 1){
    res.status(400).send("HTTP 400: Parameter invalid, message is too short or exceeds 140 characters")
  } else{
    var jsonMessage = {"message":message, "flag":false};
    MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
      if (err) throw err;

      db = client.db();

      db.collection('messages').insertOne(jsonMessage);
      
      client.close();
    });
    res.status(200);
    res.send("Added message");
    }
});

app.get('/flag', function (req, res) {
  var id = req.query.id;
  if ( id == undefined){
    res.status(400).send("HTTP 400: Parameter invalid or missing")
  }else{
    MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
      if (err) throw err;

      db = client.db();
      db.collection('messages').findOneAndUpdate({"_id": ObjectId(id)}, {$set: {"flag": true}}, function(err, result){
        if (err) throw err;
        if (result.value == null){ 
          res.status(400).send("HTTP 400: Invalid id");
        } else{
          res.status(200).send("HTTP 200: OK");
        }
      });

      client.close();
    });
  }
});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});