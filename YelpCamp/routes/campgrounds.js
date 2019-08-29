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
router.post("/", isLoggedIn, function(req, res) {
  //Get data from Form and add to Campgrounds Array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author: author};
  // Create a new Campground and save it to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }
    else {
      //Redirect to the Campgrounds Page
      console.log('Newly Created');
      
      res.redirect("/campgrounds");
    }
  })
});

// Show Form to create a new Campground
router.get("/new", isLoggedIn, function(req, res) {
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", {campground: foundCampground});
    }
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
  // Find and Update the correct campgrounds
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // Redirect somewhere (Show Page)
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;