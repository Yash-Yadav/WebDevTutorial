var express       = require('express'),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local")
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Sandy wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// To Avoid using the User object passing in all the functions
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", function(req, res) {
  res.render("landing");
});

// Index- Show all campgrounds
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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


// ==================================
// AUTH ROUTES
// ==================================

// Register
app.get("/register", function(req, res) {
  res.render("register");
});
// Handle Sign Up Logic
app.post("/register", function(req, res) {
  // res.send("Signing Up...")
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// Login
app.get("/login", function(req, res) {
  res.render("login");
});
// Handling Login Logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
  // Nothing here in the CallBack
});

// Logout Route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds")
});

// Is the User Logged In
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


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