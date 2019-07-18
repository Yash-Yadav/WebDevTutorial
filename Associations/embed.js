var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});

// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// });
// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding, go to potion class & learn it!"
// });

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// Finding an Existing Doc
User.findOne({name: "Hermione Granger"}, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
    user.posts.push({
      title: "3 Things I really hate",
      content: "Voldemort. Voldemort. Voldemort."
    });
    user.save(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});