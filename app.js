const express = require( 'express' );
const app = express(); // creates an instance of an express application
const volleyball = require('volleyball');
//to use morha

app.use("/special", function(request, response, next){
  console.log(request.url, "/special url");
  console.log(response.statusCode, "/special statusCode");
  next("/news");
})

app.use(volleyball);

app.get("/news", function(request, response){
  console.log("Executed news");
  response.status(200).send("This is the latest news...");
})

app.get("/", function(request, response){
  console.log("Executed Get");
  response.status(200).send("Hi There " + Math.random());
})

app.listen(3000, function(){
  console.log("ready");
})
