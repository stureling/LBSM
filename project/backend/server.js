var passport = require('passport')
    .LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

app.use(cors());

MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
    //Checks if mongodb is running
    if (err) throw err;

    db = client.db();
    client.close();
});

app.all('*', function(req, res, next){
    if (req.method != "GET" || req.method != "POST"){
        res.status(405).send("HTTP 405: Method not allowed")
    }else{
        next();
    }
})

// PATHS GO HERE
app.get('/user/:username', function(req, res){
    //specific users page
});

app.get('/home', function(req, res){
    //logged in users homepage
});

app.post('/login', function(req, res){
    passport.authenticate('local',{ successRedirect: '/home'})
});

app.post('/register', function(req, res){
    //register a new user
});

app.get('/cleardatabase', function(req, res){
    //temporary path used for testing, remove this when not running in dev mode
    MongoClient.connect('mongodb://localhost:27017/tdp013', {useNewUrlParser:true, useUnifiedTopology:true}, function (err, client) {
        if (err) throw err;

        db = client.db();
        db.collection('users').deleteMany();
        db.collection('userpages').deleteMany();
        db.collection('logins').deleteMany();
        client.close();
    });
});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});