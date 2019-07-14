var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req,res) {
  res.send("Hello!");
});

app.listen(3000, function() {
  console.log("Server has Started...");  
});