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
  secret: "Sandy is the best and cutest Dog in this World!",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

// Reading the Session, Take data from Session that's encoded
passport.serializeUser(User.serializeUser);
// Reading the Session, decode the data read
passport.deserializeUser(User.deserializeUser);

// ===============
// ROUTES
// ===============

app.get("/", function(req,res) {
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res) {
  res.render("secret");
});

// Auth Routes
app.get("/register", function(req,res) {
  res.render("register");
});
// handling User Signup
app.post('/register', function(req,res){
  User.register(new User({username: req.body.username}), req.body.password, function(err,user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req,res, function(){
      res.redirect("/secret");
    });
  });
});

// LOGIN ROUTES
app.get("/login", function(req,res) {
  res.render("login");
});
// Login Logic
// Middleware- Code that runs before the final route callback here
app.post("/login", passport.authenticate("local",{failureRedirect: "/login"}),
  function(req, res, next) {
    res.redirect('/secret');
      // Empty for now...
      // return done(null, req.user);
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, function() {
  console.log("Server has Started");
});