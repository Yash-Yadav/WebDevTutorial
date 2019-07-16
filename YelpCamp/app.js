var express = require('express'),
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Site2",
//     image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"
//   }, function(err, campground) {
//     if(err) {
//       console.log("Something went wrong!");
//       console.log(err);
//     }z
//     else {
//       console.log("Newly created Campgrounf");
//       console.log(campground);
//     }
//   }
// );

// Old Way of storing Data in RAM
// var campgrounds = [
//   {name: "Site1", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site2", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site3", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site4", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"}
// ];
``
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
// Get all camppgrounds from DB
Campground.find({}, function(err, allCampgrounds) {
  if(err) {
    console.log(err);
  }
  else {
    res.render("campgrounds", {campgrounds: allCampgrounds});
  }
});
  // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  //Get data from Form and add to Campgrounds Array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }
    else {
      //Redirect to the Campgrounds Page
      res.redirect("/campgrounds");
    }
  })
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});


app.listen(3000, function() {
  console.log("The YelpCamp Server has Started");
});

// Image Source: https://photosforclass.com/search/camping