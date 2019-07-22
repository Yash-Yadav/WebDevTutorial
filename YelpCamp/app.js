var express    = require('express'),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
    res.render("campgrounds/index", {campgrounds: allCampgrounds});
  }
});
  // res.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE- add a new Campground to DB
app.post("/campgrounds", function(req, res) {
  //Get data from Form and add to Campgrounds Array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
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

// Show Form to create a new Campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

// Show Form to create a new Campground
app.get("/campgrounds/:id", function(req, res) {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(foundCampground);
      
      // Render show template with that Campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// ==================================
// COMMENTS ROUTES
// ==================================
app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
  // create new Comment
  // Connect new comment to campground
  // redirect campground show page
});


app.listen(3000, function() {
  console.log("The YelpCamp Server has Started");
});

// Image Source: https://photosforclass.com/search/camping

// Old Way of storing Data in RAM
// var campgrounds = [
//   {name: "Site1", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site2", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site3", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"},
//   {name: "Site4", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c732c79d69544c650_340.jpg"}
// ];