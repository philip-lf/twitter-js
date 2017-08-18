const express = require( 'express' );
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const router = require('./routes');
var socketio = require('socket.io');

const app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper directory for templates

var server = app.listen(3000, function(){
  console.log('Server ready to receive requests...');
})
var io = socketio.listen(server);

app.use(volleyball);

app.use(express.static('public'));

app.use('/', router(io));
