var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("Search");
});

app.get("/results", function(req,res) {
  var query = req.query.searchedItem;
  var apiKEY = "NULL" // API Key Goes Here
  var url = "http://www.omdbapi.com/?s=" + query + "&apikey=" + apiKEY;
  
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("Server has Started...");  
});