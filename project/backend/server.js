var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var cors = require('cors');
var assert = require('assert');
var mongoose = require('mongoose')
const port = 3000;

// MONGOOSE CONFIGURATION

mongoose.connect('mongodb://localhost/lbsm', { useUnifiedTopology: true, useNewUrlParser : true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongodb connection established");
});

var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    username: String,
    password: String,
    email: String
});

var UserSchema = new Schema({
    user: String,
    friends: Array,
    boops: Array,
    content: Array
});

var Login = mongoose.model('Login', LoginSchema)
var User = mongoose.model('User', UserSchema)

// PASSPORT CONFIGURATION

passport.use(new LocalStrategy(
    function(username, password, done) {
        Login.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
               return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// EXPRESS MIDDLEWARE INITIALIZATION

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

//  PATHS

app.param('username', function (req, res, next, username) {
  // ... Perform database query and
  // ... Store the user object from the database in the req object
    userObject = User.findOne(username)
    req.userobject = userObject;
    return next();
});

app.all('*', function(req, res, next){
    if (req.method != "GET" && req.method != "POST"){
        res.status(405).send("HTTP 405: Method not allowed")
    }else{
        next();
    }
})

app.get('/user/:username', function(req, res){
    //specific users page
    if(!req.isAuthenticated()){
        res.status(401).send("HTTP 401: Unauthorized, please log in");
    }else{
        console.log("please wörk")
        res.status(200).send("page of user " + req.body.username)
    }
});

app.get('/user/:username/friends', function(req, res){
    //specific users friendlist
});

app.get('/user/:username/addfriend', function(req, res){
    var currentUser = req.user;
    var friend = req.params.username
    res.status(200).send("friendlist for " + req.params.username)

    //add user to friendlist
});

app.get('/user/:username/removefriend', function(req, res){
//add user to friendlist
    var currentUser = req.params.user;
    var friend = req.params.username

});

app.get('/home', function(req, res){
//test page
    res.send("Welcome to the home page!")
});

app.get('/login', function(req, res){
//test page
    res.send("Welome to the login page")
});

app.post('/login', 
passport.authenticate('local',
    { successRedirect: '/home', 
    failiureRedirect: '/login', 
    failiureFlash: true }));

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/home');
});

app.post('/register', function(req, res){
    //register a new user
    console.log(req.body)
    Login.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;

        if (user == null){
            var newLogin = new Login({username: req.body.username, 
                password: req.body.password, 
                email : req.body.email});
            console.log("created user " + newLogin)
            newLogin.save(function(err, newLogin){
                if (err) return console.error(err);
                console.log("registered user ", newLogin)
            });
            res.send("user registered")
        }else{
            res.send("user already in database");
        }
    })
});

app.get('/cleardatabase', function(req, res){
    //temporary path used for testing, remove this when not running in dev mode
    Login.deleteMany({}, function(err) { 
       console.log('Login collection removed') 
    });

    User.deleteMany({}, function(err) { 
       console.log('User collection removed') 
    });

    UserPage.deleteMany({}, function(err) { 
       console.log('UserPage collection removed') 
    });

    res.status(200).send("Cleared database");
    console.log("Cleared database");
});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});
