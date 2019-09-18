const express = require('express');
const app = express();
const port = 3000;
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var testMessage = {"message":["test", false]};

MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
  if (err) throw err;

  // Clear database
  client.collection('messages').deleteMany();

  // Insert testMessage into database
  client.collection('messages').insertOne(testMessage);
  // Print database
  client.collection('messages').find().toArray(function (err, result) {
    if (err) throw err;

    console.log(result)
  });
  client.close();
});

// res nedanför är den funktionen som ska kallas när routen anropas
// Visa alla meddelanden
app.get('/', function (req, res) {
  MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
    if (err) throw err;

    client.collection('messages').find().toArray(function (err, result) {
      if (err) throw err;

      res.send(result);
    });
    client.close();
  });
});


app.post('/', function (req, res) {
    res.send('')});
app.post('/flag', function (req, res) {
    res.send('')});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

