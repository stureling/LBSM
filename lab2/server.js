const express = require('express');
const app = express();
const port = 3000;
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var testMessage = {"message":["test", false]};

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
  if (err) throw err;

  var db = client.db('tdp013');

  // Clear database
  db.collection('messages').deleteMany();

  // Insert testMessage into database
  db.collection('messages').insertOne(testMessage);
  // Print database
  db.collection('messages').find().toArray(function (err, result) {
    if (err) throw err;

    console.log(result)
  });
});

// res nedanför är den funktionen som ska kallas när routen anropas
// Visa alla meddelanden
app.get('/', function (req, res) {
  MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
    if (err) throw err;

    var db = client.db('tdp013');

    db.collection('messages').find().toArray(function (err, result) {
      if (err) throw err;

      res.send(result)});
  });
});

app.post('/', function (req, res) {
    res.send('')});
app.post('/flag', function (req, res) {
    res.send('')});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

