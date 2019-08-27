var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");
    
// Index- Show all campgrounds
router.get("/", function(req, res) {
// Get all camppgrounds from DB
  console.log(req.user);  
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE- add a new Campground to DB
router.post("/", function(req, res) {
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
      res.redirect("/");
    }
  })
});

// Show Form to create a new Campground
router.get("/new", function(req, res) {
  res.render("campgrounds/new");
});

// Show the  Campground
router.get("/:id", function(req, res) {
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

module.exports = router;