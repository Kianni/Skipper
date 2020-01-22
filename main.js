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

  app.set("view engine", "ejs");
  app.use(layouts);

  app.use(
    express.urlencoded({
      extended: false
    })
  );
  app.use(express.json());

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


app.use("/", router);
app.use(express.static("public"));

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

  router.get("/", homeController.welcome);



//without path static files are not available via URL
  router.get("/storm", homeController.showPhoto);

//why use?
  //router.use(errorController.pageNotFound);
  //router.use(errorController.internalServerError);
