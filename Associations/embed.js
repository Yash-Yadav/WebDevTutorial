var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String
});
var User = mongoose.model("User", userSchema);

// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  contnet: String
});
var User = mongoose.model("Post", postSchema);

var newUser = new User({
  email: "charlie@brown.edu",
  name: "Charlie Brown"
});
newUser.save(function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
    
  }
})