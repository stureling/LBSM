const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nJwt = require('njwt');
const secureRandom = require('secure-random');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const port = 3000;
const secret = 'superdupersecret'


// MISC FUNCTIONS


// MONGOOSE CONFIGURATION

mongoose.connect('mongodb://localhost/lbsm', { useUnifiedTopology: true, useNewUrlParser : true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongodb connection established");
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:   String,
    password:   String,
    email:      String,
    sessions:   Array,
    friends:    Array,
    friendreq:  Array,
    boops:      Array
});

var PostSchema = new Schema({
    postedBy:   String,
    postedTo:   String,
    postedAt:   Date,
    post:       String
});

var KeySchema = new Schema({
    passKey:    String,
    salt:       String,
    apiKey:     String
});

var User = mongoose.model('User', UserSchema)
var Key = mongoose.model('Key', KeySchema)
var Post = mongoose.model('Post', PostSchema)

// EXPRESS MIDDLEWARE INITIALIZATION

var app = express();
//app.use(cookieParser(secret))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    "credentials": true,
    "origin": ["http://127.0.0.1:8080", "http://localhost:8080", "http://10.253.244.88:8080"],
    "methods": "GET, POST, PUT",
    "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
    "preflightContinue": true
}));

app.use(cookieParser());
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 86400 * 1000 }
}));
// ENCRYPTION


Key.find(function(err, key){
    
});

var signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes

// PATHS
app.param('username', function (req, res, next, user) {
  // ... Perform database query and
  // ... Store the user object from the database in the req object
    User.findOne({sessions : req.session.id }, function(err, logUser){
        if(!logUser){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            User.findOne({username: user}, function(err, reqUser){
                if(!reqUser){ 
                    res.status(404).send("User not found");
                }else{
                    req.reqUser = reqUser;
                    req.logUser = logUser;
                    return next();
                }
            });
        }
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
    res.status(200).send("page of user " + req.reqUser.username)
});
app.get('/validauth', function(req, res){
//specific users page
    User.findOne({sessions : req.session.id }, function(err, user){
        if(!user){
            res.status(200).send("false");
        }else{
            res.status(200).send("true")
        }
    });
});
app.get('/user/:username/friends', function(req, res){
//specific users friendlist
    if ( req.logUser.username in req.reqUser.friends ){
        res.send(reqUser.friends);
    }else{
        res.send("Client not in friend list");
    }
});

app.get('/user/:username/addfriend', function(req, res){
//send friendrequest
    User.findOneAndUpdate({username : req.reqUser }, 
        {$push: {friendreq: req.logUser.username}}, 
        function(err, requstedFriend){

        if(!requestedFriend){
            res.send("friend request failed");
        }else{
            res.send("friend request sent");
        }
    });
});

app.get('/user/:username/removefriend', function(req, res){
//remove user from friendlist
    User.findOneAndUpdate({username : req.logUser.username }, 
        {$remove: {friends: req.reqUser.username}}, 
        function(err, user1){

        User.findOneAndUpdate({username : req.reqUser.username }, 
            {$remove: {friends: req.logUser.username}}, 
            function(err, user2){

            if(!user1 || !user2){
                res.status(500).send(("Tried to remove friend of undefined user"));
            }else{
                console.log(req.logUser.username,
                    " are no longer friends with ", 
                    req.reqUser.username);
            }
        });
    });
});

app.get('/home', function(req, res){
//test page
    User.findOne({sessions : req.session.id }, function(err, logUser){
        if(!logUser){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            res.send("Welcome to the home page for user: ", logUser.username)
        }
    });
});

app.get('/unauthourize', function(req, res){
//test page
    res.send()
    User.findOneAndUpdate( { sessions: req.signedCookies.accessToken }, 
        { $set:{ sessions: [req.signedCookies.accessToken]}}, 
        function(err, user){

        res.send("Logged out all other sessions")
    });
});

app.get('/login', function(req, res){
//test page
    res.send("Welome to the login page")
});

app.post('/login', function(req, res){
    //login
    console.log("request body: ",req.body);
    User.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;
        console.log(user)

        if (user != null){
            //The hashing step could be moved to frontend for extra security
            //bcrypt.compare(req.body.password, user.password, function(err, result){
            //
            //});
            if(user.password == req.body.password){
                req.session.user = user.username
                //
                User.findOneAndUpdate({ username: user.username }, { $push: { sessions: req.session.id }}, {useFindAndModify: false },function(err, result){
                    if (err) throw err;
                    console.log(result)
                });
                res.json(req.session.user);
            }else{
                res.status(401).send("HTTP 401: Unauthorized, invalid password");
            }
        }else{
            res.status(401).send("HTTP 401: Unauthorized, invalid username");
        }
    })
    
});

app.get('/logout', function(req, res){
    // delete session cookie from database
});

app.post('/register', function(req, res){
    //register a new user
    console.log(req.body)
    console.log(req.url)
    User.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;

        if (user == null){
            //The hashing step could be moved to frontend for extra security
            bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                console.log("password: ", req.body.password);
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
        }
        else{
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
