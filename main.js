const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  layouts = require("express-ejs-layouts"),
  router = require("./routes/index"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  User = require("./models/user");

mongoose.Promise = global.Promise;

// connecting to DB
mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  {useNewUrlParser: true});

  // Что это - об этом не было в книге, взял из гитхаба
    mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!")
})

app.set("port", process.env.PORT || 3000);
// ejs-views, public and layouts
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);

//what does this code?
app.use(
  express.urlencoded({
    extended: false
  })
);

// for PUT and UPDATE methods?????
// Почему мы здесь указываем пост и гэт,
// как аргумент - PUT для /update
// как аргумент - DELETE для /delete
//?????????
app.use(methodOverride("_method", {
  methods: ["POST","GET"]
}));
app.use(express.json());

// listing 25.4
app.use(cookieParser("secretCuisine123"));
app.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use(expressValidator());

app.use("/", router);

const server = app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
}),
  io = require("socket.io")(server);

  chatController = require("./controllers/chatController")(io);
