const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const secret = 'superdupersecret';

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
    boops:      Array,
    postsTo:    Array,
    postsFrom:  Array
});

var User = mongoose.model('User', UserSchema)

// EXPRESS MIDDLEWARE INITIALIZATION
var app = express();
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
                    res.status(404).send("user not found");
                }else{
                    req.reqUser = reqUser;
                    req.logUser = logUser;
                    next();
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

app.get('/users', function(req, res){
//specific users page
    User.findOne({sessions : req.session.id }, function(err, logUser){
        if(!logUser){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            var response = [];
            User.find(function(err, data){
                for(index in data){
                    response.push(data[index].username)
                }
                res.send(response);
            });
        }
    });
});

app.get('/user/:username', function(req, res){
//specific users page
    if(req.reqUser.friends.includes(req.logUser.username) || req.reqUser.username === req.logUser.username){
        res.json({to: req.reqUser.postsTo, from: req.reqUser.postsFrom})
    }else{
        res.send("you are not friends with " + req.reqUser.username)
    }
});

app.get('/user/:username/status', function(req, res){
//check friend status
    if(req.reqUser.friends.includes(req.logUser.username)){
        res.send("friends")
    }else if (req.reqUser.friendreq.includes(req.logUser.username)){
        res.send("pending request them")
    }else if (req.logUser.friendreq.includes(req.reqUser.username)){
        res.send("pending request you")
    }else if (req.logUser.username === req.reqUser.username){
        res.send("you")
    }else{
        res.send("no relation")
    }
});

app.post('/user/:username/post', function(req, res){
//specific users page
    var d = new Date
    var newPost = { 
        poster: req.logUser.username,
        postee: req.reqUser.username,
        text: req.body.text,
        date: d.toDateString() 
    }
    if(req.reqUser.username === req.logUser.username){
    req.logUser.postsFrom.unshift(newPost)
    req.logUser.postsTo.unshift(newPost)
    req.logUser.save()
    }else{
    req.logUser.postsFrom.unshift(newPost)
    req.reqUser.postsTo.unshift(newPost)
    req.logUser.save()
    req.reqUser.save()
    }


    res.send(newPost)
});

app.get('/user/:username/friends', function(req, res){
//specific users friendlist
    if ( req.reqUser.friends.includes(req.logUser.username) || 
        req.reqUser.username === req.logUser.username ){
        res.send(req.reqUser.friends);
    }else{
        res.send("client not in friend list");
    }
});

app.get('/user/:username/addfriend', function(req, res){
//send friendrequest
    if(req.reqUser.friendreq.includes(req.logUser.username)){
        res.send("friend request already sent");
    }else{
        req.reqUser.friendreq.push(req.logUser.username);
        req.reqUser.save()
        res.send("friend request sent");
    }
});

app.get('/user/:username/removefriend', function(req, res){
//remove user from friendlist
    var friendIndex = req.logUser.friends.indexOf(req.reqUser.username);
    req.logUser.friends.splice(friendIndex, 1);
    req.logUser.save();

    var friendIndex = req.reqUser.friends.indexOf(req.logUser.username);
    req.reqUser.friends.splice(friendIndex, 1);
    req.reqUser.save();

    res.send(req.logUser.username +" removed " + req.reqUser.username + " from friends" )
});

app.get('/friendrequests', function(req, res){
//specific users incoming friendrequests
    User.findOne({sessions : req.session.id }, function(err, logUser){
        if(!logUser){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            res.send(logUser.friendreq);
        }
    });
});

app.get('/user/:username/acceptfriend', function(req, res){
//accept friendrequest
    if( req.logUser.friendreq.includes(req.reqUser.username)){
        
        req.reqUser.friends.push(req.logUser.username)
        req.logUser.friends.push(req.reqUser.username)
        
        var friendIndex = req.logUser.friendreq.indexOf(req.reqUser.username);
        req.logUser.friendreq.splice(friendIndex, 1);

        req.reqUser.save();
        req.logUser.save();

        res.send(req.logUser.username + " and " + req.reqUser.username + " are now friends");
    }else{
        res.send("friend request does not exist");
    }
});

app.get('/user/:username/cancelfriend', function(req, res){
//reject and cancel friendrequest
    if( req.logUser.friendreq.includes(req.reqUser.username)){
        
        var friendIndex = req.logUser.friendreq.indexOf(req.reqUser.username);
        req.logUser.friendreq.splice(friendIndex, 1);

        req.logUser.save();

        res.send(req.logUser.username + " and " + req.reqUser.username + " have cancelled friend request");
    }else if (req.reqUser.friendreq.includes(req.logUser.username)){
        var friendIndex = req.reqUser.friendreq.indexOf(req.logUser.username);
        req.reqUser.friendreq.splice(friendIndex, 1);
        req.reqUser.save();

        res.send(req.logUser.username + " and " + req.reqUser.username + " have cancelled friend request");
    }else{
        res.send("friend request does not exist");
    }
});

app.get('/home', function(req, res){
//returns the logged in users username to be used as a :username param in subsequent calls
    User.findOne({sessions : req.session.id }, function(err, logUser){
        if(!logUser){
            res.status(401).send("HTTP 401: Unauthorized, please log in");
        }else{
            res.send(logUser.username)
        }
    });
});

app.post('/login', function(req, res){
    //login
    User.findOne({username : req.body.username }, function(err, user){
        if (err) throw err;

        if (user){
            if(req.body.password === user.password){
                req.session.user = user.username
                if (!user.sessions.includes(req.session.id)){
                    user.sessions.push(req.session.id);
                    user.save();
                }
                res.json({username: req.session.user});
            }else{
                res.status(401).send("invalid password");
            }
        }else{
            res.status(401).send("invalid username");
        }
    })
    
});

app.get('/logout', function(req, res){
    // delete session cookie from database
    User.findOne( { sessions: req.session.id }, 
        function(err, user){
        if(!user){
            res.send("not logged in")
        }else{
            var index = user.sessions.indexOf(req.session.id)
            user.sessions.splice(index, 1)
            user.save();
            req.session.destroy();
            res.send("logged out")
        }
    });
});

app.post('/register', function(req, res){
    //register a new user
    if (req.body.email === '' || req.body.username === '' || req.body.password === '' ) {
        res.status(401).send("HTTP 401: Unauthorized, a required field is empty");
    }else {
        User.findOne({username : req.body.username }, function(err, user){
            if (err) throw err;
    
            if (user == null){
                var newUser = new User({username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    sessions: [],
                    friends: [],
                    boops: [],
                    content: [],
                });
                newUser.save(function(err, newUser){
                    if (err) return console.error(err);
                });
                res.send("user registered")
                    //});
            }
            else{
                res.send("user already in database");
            }
        })
    }
});

app.get('/cleardatabase', function(req, res){
    //temporary path used for testing, remove this when not running in dev mode
    User.deleteMany({}, function(err) { 
    });

    res.status(200).send("Cleared database");
});

app.listen(port, () => console.log(`Express: App listening on port ${port}!`));

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});
