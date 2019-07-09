var express = require("express");
var app = express();

//"/" => "Hi There"
app.get("/", function(req, res) {
  res.send("Hi There!");
})

//"/bye" => "GoodBye"
app.get("/bye", function(req, res) {
  res.send("GoodBye!");
})

//"/dog" => "MEOW!"
app.get("/dog", function(req, res) {
  res.send("MEOW!");
})

app.listen(3000, function () {
  console.log("Server has started");
});