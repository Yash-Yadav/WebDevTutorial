var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/friends", function(req, res){
  var friends = ["Aman","Jogendar", "Pravesh", "Preet"];
  res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req,res) {
  res.send("Hello PostMan!!!");
});



app.listen(3000, function () {
  console.log("Server has started");
});