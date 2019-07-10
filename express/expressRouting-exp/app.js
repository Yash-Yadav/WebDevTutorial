var express = require("express");
var app = express();

app.get("/", function(req,res) {
  res.send("App is running...");
});

app.get("/speak/:animalName", function(req,res) {
  var sounds = {
    pig: "Oink",
    cow: "MOO",
    dog: "Woof Woof!",
    cat: "Meow!",
    goldfish: "..."
  };
  var animal = req.params.animalName.toLowerCase();
  var sound = sounds[animal];

  res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:message/:times", function(req,res) {
  var msg = req.params.message;
  var times = Number(req.params.times);
  var result = "";
  for (let i = 0; i < times; i++) {
    result += msg + " ";
  }
  res.send(result);
});

app.get("*", function(req, res) {
  res.send("404 Error Not Found!!!");
});

app.listen(3000, function () {
  console.log("Server has started");
});