var superagent = require('superagent');
var request = require('request');
var assert = require('assert');
var should = require('should');
require('./server');

var url = 'http://localhost:3000'
var d = new Date();

request.get(url + '/cleardatabase', function(error, response){
console.log(response.body);
});

describe('Server', function(){
  describe('Route: / and method testing', function(){
    it('should return 404 not found', function(done){
      superagent(url, function(error, response){
        response.status.should.equal(404);
        response.text.should.equal('Sorry can\'t find that!')
        done();
      });
    });
    it('should return 405 not allowed', function(done){
      request.put(url, function(error, response){
        response.statusCode.should.equal(405);
        response.body.should.equal("HTTP 405: Method not allowed")
        done();
      });
    });
  });
  describe('Routes: /register, /login, /logout and /home', function(){
    var agent = superagent.agent();
    it('/register should return user registered', function(done){
      agent.post(url + '/register').send({username: 'test', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user registered');
        done();
      });
    });
    it('/register should return user already in database using the same username again', function(done){
      agent.post(url + '/register').withCredentials().send({username: 'test', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user already in database');
        done();
      });
    });
    it('/register should reject request when fields are empty', function(done){
      agent.post(url + '/register').withCredentials().send({username: '', password: '', email: ''}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal('HTTP 401: Unauthorized, a required field is empty');
        done();
      });
    });
    it('/home should return "401 Unautorized" on call without auth', function(done){
      agent.get(url + '/home').end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal('HTTP 401: Unauthorized, please log in');
        done();
      });
    });
    it('/login should return invalid username', function(done){
      agent.post(url + '/login').withCredentials().send({username: 'wrong', password: 'test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal('invalid username');
        done();
      });
    });
    it('/login should return invalid password', function(done){
      agent.post(url + '/login').withCredentials().send({username: 'test', password: 'wrong'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal('invalid password');
        done();
      });
    });
    it('/login should return username', function(done){
      agent.post(url + '/login').withCredentials().send({username: 'test', password: 'test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.body.username.should.equal('test');
        done();
      });
    });
    it('/home should return current users username', function(done){
      agent.get(url + '/home').withCredentials().end(function(error, response){
        response.text.should.equal('test');
        done();
      });
    });
    it('/logout should invalidate auth', function(done){
      agent.get(url + '/logout').withCredentials().end(function(error, response){
        response.text.should.equal('logged out');
        done();
      });
    });
    it('/logout should fail when not logged in', function(done){
      agent.get(url + '/logout').withCredentials().end(function(error, response){
        response.text.should.equal('not logged in');
        done();
      });
    });
  });
  describe('Friendship between users', function(){
    var agent1 = superagent.agent();
    var agent2 = superagent.agent();
    it('register friend1', function(done){
      agent1.post(url + '/register').send({username: 'friend1', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user registered');
        done();
      });
    });
    it('register friend2', function(done){
      agent2.post(url + '/register').send({username: 'friend2', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user registered');
        done();
      });
    });
    it('/friendrequests should fail when not logged in', function(done){
      agent1.get(url + '/friendrequests').withCredentials().end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal('HTTP 401: Unauthorized, please log in');
        done();
      });
    });
    it('login friend1', function(done){
      agent1.post(url + '/login').withCredentials().send({username: 'friend1', password: 'test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.body.username.should.equal('friend1');
        done();
      });
    });
    it('login friend2', function(done){
      agent2.post(url + '/login').withCredentials().send({username: 'friend2', password: 'test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.body.username.should.equal('friend2');
        done();
      });
    });
    it('friend1 request friend2', function(done){
      agent1.get(url + '/user/friend2/addfriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend request sent');
        done();
      });
    });
    it('subsequent friend requests should fail while the first is not resolved', function(done){
      agent1.get(url + '/user/friend2/addfriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend request already sent');
        done();
      });
    });
    it('friend1 in friend2 requestlist', function(done){
      agent2.get(url + '/friendrequests').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.body.should.containDeep(['friend1'])
        done();
      });
    });
    it('friend1 status with themselves', function(done){
      agent1.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('you');
        done();
      });
    });
    it('friend1 status with friend2 should be "pending request them"', function(done){
      agent1.get(url + '/user/friend2/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('pending request them');
        done();
      });
    });
    it('friend2 status with friend1 should be "pending request you"', function(done){
      agent2.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('pending request you');
        done();
      });
    });
    it('friend2 deny friend1s friend request', function(done){
      agent2.get(url + '/user/friend1/cancelfriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend2 and friend1 have cancelled friend request');
        done();
      });
    });
    it('friend2 status with friend1 should be "no relation" after request denial', function(done){
      agent2.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('no relation');
        done();
      });
    });
    it('subsequent denys should fail', function(done){
      agent2.get(url + '/user/friend1/cancelfriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend request does not exist');
        done();
      });
    });
    it('friend1 cancels their friend request with friend2', function(done){
      agent1.get(url + '/user/friend2/addfriend').withCredentials().end(function(error1, response1){
        agent1.get(url + '/user/friend2/cancelfriend').withCredentials().end(function(error, response){
          response.status.should.equal(200);
          response.text.should.equal('friend1 and friend2 have cancelled friend request');
          done();
        });
      });
    });
    it('friend2 status with friend1 should be "no relation" after cancellation', function(done){
      agent2.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('no relation');
        done();
      });
    });
    it('friend2 accepts the friend request from friend1', function(done){
      agent1.get(url + '/user/friend2/addfriend').withCredentials().end(function(error1, response1){
        agent2.get(url + '/user/friend1/acceptfriend').withCredentials().end(function(error, response){
          response.status.should.equal(200);
          response.text.should.equal('friend2 and friend1 are now friends');
          done();
        });
      });
    });
    it('subsequent calls to accept friend should fail', function(done){
      agent2.get(url + '/user/friend1/acceptfriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend request does not exist');
        done();
      });
    });
    it('friend2 status with friend1 should be "friends" after request acceptance', function(done){
      agent2.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friends');
        done();
      });
    });
    it('friend1 status with friend2 should be "friends" after request acceptance', function(done){
      agent1.get(url + '/user/friend2/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friends');
        done();
      });
    });
    it('friend1 friend list should contain friend2', function(done){
      agent1.get(url + '/user/friend1/friends').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.body.should.containDeep(['friend2']);
        done();
      });
    });
    it('friend1 removes friend2', function(done){
      agent1.get(url + '/user/friend2/removefriend').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('friend1 removed friend2 from friends');
        done();
      });
    });
    it('friend1 status with friend2 should return "no relation"', function(done){
      agent2.get(url + '/user/friend1/status').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('no relation');
        done();
      });
    });
    it('friend2 friend list should not be available when not friends with them', function(done){
      agent1.get(url + '/user/friend2/friends').withCredentials().end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal("client not in friend list");
        done();
      });
    });
  });
  describe('Route: /users', function(){
    var agent = superagent.agent();
    it('register 3 users', function(done){
      agent.post(url + '/register').send({username: 'user1', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user registered');
        agent.post(url + '/register').send({username: 'user2', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
          response.status.should.equal(200);
          response.text.should.equal('user registered');
          agent.post(url + '/register').send({username: 'user3', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
            response.status.should.equal(200);
            response.text.should.equal('user registered');
            done();
          });
        });
      });
    });
    it('/users should fail without valid auth ', function(done){
      agent.get(url + '/users').withCredentials().end(function(error, response){
        response.text.should.equal('HTTP 401: Unauthorized, please log in');
        done();
      });
    });
    it('/login for proper auth ', function(done){
      agent.post(url + '/login').withCredentials().send({username: 'user1', password: 'test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.body.username.should.equal('user1');
        done();
      });
    });
    it('/users should return a list over all users ', function(done){
      agent.get(url + '/users').withCredentials().end(function(error, response){
        response.body.should.containDeep(['user1', 'user2', 'user3']);
        done();
      });
    });
  });
  describe('posts and posting', function(){
    var agent1 = superagent.agent();
    var agent2 = superagent.agent();
    it('register 2 users', function(done){
      agent1.post(url + '/register').send({username: 'poster1', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.status.should.equal(200);
        response.text.should.equal('user registered');
        agent2.post(url + '/register').send({username: 'poster2', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
          response.status.should.equal(200);
          response.text.should.equal('user registered');
          done();
        });
      });
    });
    it('/user/:username should fail when user is not logged in', function(done){
      agent1.get(url + '/user/poster2').withCredentials().end(function(error, response){
        response.status.should.equal(401);
        response.text.should.equal("HTTP 401: Unauthorized, please log in");
        done();
      });
    });
    it('login 2 users', function(done){
      agent1.post(url + '/login').send({username: 'poster1', password: 'test', email: 'test@test.test'}).set('accept', 'json').end(function(error, response){
        response.body.username.should.equal('poster1');
        agent2.post(url + '/login').send({username: 'poster2', password: 'test'}).set('accept', 'json').end(function(error, response){
          response.body.username.should.equal('poster2');
          done();
        });
      });
    });
    it('/user/:username should fail when not friends', function(done){
      agent1.get(url + '/user/poster2').withCredentials().end(function(error, response){
        response.text.should.equal("you are not friends with poster2");
        done();
      });
    });
    it('/user/:username should fail when username does not exist', function(done){
      agent1.get(url + '/user/poster3').withCredentials().end(function(error, response){
        response.status.should.equal(404);
        response.text.should.equal("user not found");
        done();
      });
    });
    it('friend 2 users', function(done){
      agent1.get(url + '/user/poster2/addfriend').withCredentials().end(function(error, response){
        agent2.get(url + '/user/poster1/acceptfriend').withCredentials().end(function(error, response){
          agent2.get(url + '/user/poster1/status').withCredentials().end(function(error, response){
            response.text.should.equal('friends');
            done();
          });
        });
      });
    });
    it('post on own page', function(done){
      agent1.post(url + '/user/poster1/post').send({text: "testpost"}).set('accept', 'json').end(function(error, response){
        response.body.text.should.equal('testpost');
        response.body.poster.should.equal('poster1');
        response.body.postee.should.equal('poster1');
        done();
      });
    });
    it('post on friends page', function(done){
      agent1.post(url + '/user/poster2/post').send({text: "testpost"}).set('accept', 'json').end(function(error, response){
        response.body.text.should.equal('testpost');
        response.body.poster.should.equal('poster1');
        response.body.postee.should.equal('poster2');
        done();
      });
    });
    it('/user/:username returns a list of all posts to a users page', function(done){
      agent1.get(url + '/user/poster2').withCredentials().end(function(error, response){
        response.body.should.containDeep({to:[{text: "testpost", poster: "poster1", postee: "poster2", date: d.toDateString()}], from: []});
        done();
      });
    });
  });
});
