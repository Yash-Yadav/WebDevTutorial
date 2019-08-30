var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware  = require("../middleware"); // No need to write index.js

// Root Route
router.get("/", function(req, res) {
  res.render("landing");
});

// Register
router.get("/register", function(req, res) {
  res.render("register");
});
// Handle Sign Up Logic
router.post("/register", function(req, res) {
  // res.send("Signing Up...")
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp" + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// Login
router.get("/login", function(req, res) {
  res.render("login");
});
// Handling Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
  // Nothing here in the CallBack
});

// Logout Route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;