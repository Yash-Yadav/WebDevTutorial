// All middleware goes Here
var middlewareObj = {},
    Campground    = require("../models/campground"),
    flash           = require("connect-flash"),
    Comment    = require("../models/comment");
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        req.flash("error", "Campground not found!")
        res.redirect("back");
      } else {
        // does the User own the Campground
        if(foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that.")
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be Logged in to do that...");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        // does the User own the Comment?
        // we are using equals() method as it is comparison is with the
        // Mongoose ID, see Models comment Schema for Reference
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "Campground not found!")
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be Logged in to do that...");
    res.redirect("back");
  }
};

// Is Logged In
middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be Logged in to do that...");
  res.redirect("/login");
};

module.exports = middlewareObj