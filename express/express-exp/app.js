var express = require("express");
var app = express();

//"/" => "Hi There"
app.get("/", function(req, res) {
  res.send("Hi There!");
});

//"/bye" => "GoodBye"
app.get("/bye", function(req, res) {
  res.send("GoodBye!");
});

//"/dog" => "MEOW!"
app.get("/dog", function(req, res) {
  res.send("MEOW!");
  console.log("Someone made a /dog request");
});

app.get("/r/:subredditName", function(req,res) {
  var subreddit = req.params.subredditName;
  console.log(subreddit);
  res.send("Welcome " + subreddit.toUpperCase()
    + " SUBREDDIT");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req,res) {
  console.log(req.params);  
  res.send("Welcome to the Comments Page!");
});

//Handling invalid Get Request
// Remember the Order of Call backs Matters
// So the route will be first->
//hi-> bye-> dog-> then something Gibrish...
app.get("*", function(req, res) {
  res.send("You are a STAR!!!");
});

app.listen(3000, function () {
  console.log("Server has started");
});