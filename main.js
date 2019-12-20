const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController");

  mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true});
  mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());



  app.set("port", process.env.PORT || 3000);
  app.set("view engine", "ejs");
  app.use(layouts);



  app.get("/", homeController.welcome);
  app.get("/courses", homeController.showCourses);
  app.get("/contact", subscribersController.getSubscriptionPage);
  app.get("/subscribers", subscribersController.getAllSubscribers);
//without path static files are not available via URL
  app.get("/storm", homeController.showPhoto);
  app.post("/subscribe", subscribersController.saveSubscriber);

  app.use(errorController.pageNotFound);
  app.use(errorController.internalServerError);

  app.listen(app.get("port"), () => {
    console.log(
      `Server running at http://localhost:${app.get("port")}`
    );
  });
