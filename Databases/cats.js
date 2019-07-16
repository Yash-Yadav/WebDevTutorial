var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB

var george = new Cat({
  name: "George",
  age: 11,
  temperament: "Grouchy"
});

george.save(function(error, cat) {
  if(err) {
    console.log("Something went wrong!");
  }
  else {
    console.log("We just saved a Cat to the DB");
    console.log(cat);
  }
});

// retrieve all cats from the db and Console.Log oneach one