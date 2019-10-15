const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const port = 3000;
const secret = 'superdupersecret'

// FUNCTIONS



// MONGOOSE CONFIGURATION

mongoose.connect('mongodb://localhost/lbsm', { useUnifiedTopology: true, useNewUrlParser : true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongodb connection established");
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    sessions: Array,
    friends: Array,
    boops: Array,
    content: Array
});

var User = mongoose.model('User', UserSchema)

// EXPRESS MIDDLEWARE INITIALIZATION

var app = express();
app.use(cookieParser(secret))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded());

//  PATHS

app.param('username', function (req, res, next, user) {
  // ... Perform database query and
  // ... Store the user object from the database in the req object
    console.log(user)
    User.findOne({username: user}, function(err, userObject){
        req.user = userObject;
        return next();
    });
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
    User.findOne({session : req.signedCookies.session }, function(err, user){
        if(!user){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            console.log("please wörk")
            res.status(200).send("page of user " + req.user.username)
        }
    });
});

app.get('/user/:username/friends', function(req, res){
//specific users friendlist

});

app.get('/user/:username/addfriend', function(req, res){
//add user to friendlist
    var currentUser = req.user;
    var friend = req.params.username
    res.status(200).send("friendlist for " + req.params.username)

});

app.get('/user/:username/removefriend', function(req, res){
//add user to friendlist

});

app.get('/home', function(req, res){
//test page
    res.cookie('testcookie', 'session', options)
    console.log(req.signedCookies.testcookie)
    res.send("Welcome to the home page!")
});

app.get('/login', function(req, res){
//test page
    res.send("Welome to the login page")
});

app.post('/login', function(req, res){
    //login
    console.log(req.body);
    User.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;

        if (user != null){
            console.log(user)
            //The hashing step could be moved to frontend for extra security
            //bcrypt.compare(req.body.password, user.password, function(err, result){
            //
            //});
            if(user.password == req.body.password){
                var options = {
                    maxAge: 1000 * 60 * 60 * 24 * 128, // would expire after 128 days
                    signed: true // Indicates if the cookie should be signed
                }
                var d = new Date();
                res.cookie('session', user.username + d.getTime(), options);
                res.cookie('access-token', user.username, options);
                console.log(res.locals);
                res.cookie('access-token', user.username, options);
                /*
                User.findOneAndUpdate({ username: user.username }, { $push: { session: res.signedCookies.session }},function(err, result){
                    if (err) throw err;
                });
                */
                res.send("Logged in");
            }else{
                res.send("Invalid password");
            }
        }else{
            res.send("Invalid username");
        }
    })
    
});

app.get('/logout', function(req, res){
    // delete session cookie from database
});

app.post('/register', function(req, res){
    //register a new user
    console.log(req.body)
    User.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;

        if (user == null){
            //The hashing step could be moved to frontend for extra security
            bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                console.log("passord: ", req.body.password);
                console.log("hash: ", hash);
                var newUser = new User({username: req.body.username,
                    // use hash instead of req.body.password here
                    password: req.body.password,
                    email: req.body.email,
                    sessions: [],
                    friends: [],
                    boops: [],
                    content: [],
                });
                newUser.save(function(err, newUser){
                    if (err) return console.error(err);
                    console.log("registered user ", newUser)
                });
                res.send("user registered")
            });
        }else{
            res.send("user already in database");
        }
    })
});

app.get('/cleardatabase', function(req, res){
    //temporary path used for testing, remove this when not running in dev mode
    User.deleteMany({}, function(err) { 
       console.log('User collection removed') 
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
