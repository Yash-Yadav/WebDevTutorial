var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB

// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// george.save(function(err, cat) {
//   if(err) {
//     console.log("Something went wrong!");
//   }
//   else {
//     console.log("We just saved a Cat to the DB");
//     console.log(cat);
//   }
// });

// // Creating a new Cat
// Cat.create({
//   name: "Snow White",
//   age: 15,
//   temperament: "Bland"
// }, function(err, cat) {
//   if(err) {
//     console.log("Something went wrong!");
//     console.log(err);
//   }
//   else {
//     console.log(cat);
//   }
// });

// retrieve all cats from the db and Console.Log oneach one
Cat.find({}, function(err, cats) {
  if(err) {
    console.log("Something went wrong!");
    console.log(err);
  }
  else {
    console.log("All the Cats");
    console.log(cats);
  }
})