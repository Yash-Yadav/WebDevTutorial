var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("Search");
});

app.get("/results", function(req,res) {
  request("http://www.omdbapi.com/?s=Star&apikey=d90ccb36", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("Server has Started...");  
});