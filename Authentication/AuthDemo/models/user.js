var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// All the methods are added here automatically.
// eg: serialize & deserialize
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);