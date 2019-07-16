var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Site1", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
    {name: "Site2", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
    {name: "Site3", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
    {name: "Site4", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res) {
  res.send("POST Working Fine...")
  //Get data from Form and add to Campgrounds Array
  //Redirect to the Campgrounds Page
});


app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});



app.listen(3000, function() {
  console.log("The YelpCamp Server has Started");
});