// THIS IS NOT WORKING



//SRSLY

var request = require('superagent');
var post = require('request');
var assert = require('assert');
var should = require('should');
require('./server');

var url = 'http://localhost:3000'

describe('Server', function(){

  describe('Route: /', function(){

    it('should return 404 not found', function(done){
      request(url, function(error, response){
        response.status.should.equal(404);
        response.text.should.equal('Sorry can\'t find that!')
        done();
      });
    });
    
    it('should return 405 not allowed', function(done){
      post.post(url, function(error, response){
        response.statusCode.should.equal(405);
        response.body.should.equal("HTTP 405: Method not allowed")
        done();
      });
    });
  });

  describe('Route: /save', function(){
    
    it('should save a message without error',function(done){
      request(url + "/save?message=hejsvej", function(error, response){
        response.status.should.equal(200);
        response.text.should.equal("Added message")
        done();
      });
    });
    
    it('should return HTTP 400 when meesage is missing',function(done){
      request(url + "/save", function(error, response){
        response.status.should.equal(400);
        response.text.should.equal("HTTP 400: Parameter invalid or missing")
        done();
      });
    });
    
    it('should return HTTP 400 when message is too long',function(done){
      invalidmsg = "a".repeat(145);
      request(url + "/save?message=" + invalidmsg, function(error, response){
        response.status.should.equal(400);
        response.text.should.equal("HTTP 400: Parameter invalid, message is too short or exceeds 140 characters");
        done();
      });
    });
  });

  describe('Route: /getall non-empty', function(){
    it('Should return a json-object that was saved', function(done){
      request(url + "/getall", function(error, response){
        response.status.should.equal(200);
        response.body[1]["message"].should.equal("hejsvej")
        done();
      });
    });
  });
  
  describe('Route: /flag', function(){
    it('should toggle from unread to read', function(done){
      request(url + "/flag?id=" + id, function(error, response){
        if (error){
          response.status.should.equal(400);
          done(error);
        } else{
          response.status.should.equal(200);
          done();
        }
      });
    });
  });
});
