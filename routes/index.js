const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');

tweetBank.testData();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  var value = name.split(' ').join(' ');
  // Why do we lose the last name???
  res.render( 'index', { tweets: list, showForm: true, value: value } );
});

router.get('/tweets/:id', function(req, res) {
  var id = +req.params.id;
  var list = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: list, showForm: true } );
});

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.post('/tweets', urlencodedParser, function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = function(io){
  return router;
}
