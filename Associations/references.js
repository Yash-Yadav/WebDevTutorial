var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/post");
var User = require("./models/user");


// // Finding the Doc
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// })

//Posting the Posts
Post.create({
  title: "How to cook the best burger pt 4",
  content: "hohohohohohoHOHOHOHOHOhohohoho..."
}, function(err, post) {
  User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      foundUser.posts.push(post);
      foundUser.save(function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  })
});

// User.create({
//   email: "bob@gmail.com",
//   name: "Blob belcher"
// });