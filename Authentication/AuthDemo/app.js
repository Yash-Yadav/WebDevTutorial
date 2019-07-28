var express              = require("express"),
   mongoose              = require("mongoose"),
   passport              = require("passport"),
   bodyParser            = require("body-parser"),
   User                  = require("./models/user"),
   LocalStrategy         = require("passport-local"),
   passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Sandy is the best cutest Dog in this World!"
}));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// ===============
// ROUTES
// ===============

app.get("/", function(req,res) {
  res.render("home");
});

app.get("/secret", function(req,res) {
  res.render("secret");
});

// Auth Routes
app.get("/register", function(req,res) {
  res.render("register");
});
// handling User Signup
app.post("/register", function(req,res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secret");
    });
  });
});

// LOGIN ROUTES
app.get("/login", function(req,res) {
  res.render("login");
});
// Login Logic
// Middleware
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  // successFlash: 'Welcome!',
  failureRedirect: "/login",
  // failureFlash: true
}), function(req, res) {
  // Empty for now...
  return done(null, req.user);
});


app.listen(3000, function() {
  console.log("Server has Started");
});