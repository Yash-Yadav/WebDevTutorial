var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://cdn.pixabay.com/photo/2019/06/05/23/48/death-valley-4254871__340.jpg",
    description: "Deserty Road Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, maxime quibusdam. Ex unde vero commodi voluptatem eos eligendi animi, consectetur delectus illo et at! Veniam neque ab libero vel fugit!"
  },
  {
    name: "Cloud's Rest",
    image: "https://cdn.pixabay.com/photo/2014/03/14/11/17/dancer-287078__340.jpg",
    description: "WaterFall Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, maxime quibusdam. Ex unde vero commodi voluptatem eos eligendi animi, consectetur delectus illo et at! Veniam neque ab libero vel fugit!"
  },
  {
    name: "Cloud's Rest",
    image: "https://cdn.pixabay.com/photo/2019/07/16/11/48/vietnam-4341654__340.jpg",
    description: "Lake View Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, maxime quibusdam. Ex unde vero commodi voluptatem eos eligendi animi, consectetur delectus illo et at! Veniam neque ab libero vel fugit!"
  }
];

function seedDB() {
  // Remove all Campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    }
    console.log("Removed Campground..."); 
    // Add a few Campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // Createn a  comment
          Comment.create(
            {
              text: "This place is great, But I wish there was internet",
              author: "Homer"
            }, function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save( function(err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Created a new Comment");                            
                  }
                });
              }
            });
        }
      });
    });
  });
}
module.exports = seedDB;