const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  router = express.Router(),
  methodOverride = require("method-override");

mongoose.Promise = global.Promise;

//layouts and ejs-views
app.set("view engine", "ejs");
app.use(layouts);

//what does this code?
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

//connecting to database
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});

mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!")
})

// for paths using router not app
app.use("/", router);
app.use(express.static("public"));

// for PUT and UPDATE methods?????
// Почему мы здесь указываем пост и гэт,
// как аргумент - PUT для /update
// как аргумент - DELETE для /delete
//?????????
router.use(methodOverride("_method", {
  methods: ["POST","GET"]
}));


router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);


  router.get("/", homeController.welcome);



//without path static files are not available via URL
  router.get("/storm", homeController.showPhoto);

//why use?
  //router.use(errorController.pageNotFound);
  //router.use(errorController.internalServerError);
