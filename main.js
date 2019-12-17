const express = require("express"),
  app = express();
  app.use(express.static("public"));

const layouts = require("express-ejs-layouts");

const homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController");

  app.set("port", process.env.PORT || 3000);

  app.set("view engine", "ejs");
  app.use(layouts);



  app.get("/", homeController.welcome);
  app.get("/courses", homeController.showCourses);
  app.get("/contact", homeController.showSignUp);
//without path static files are not available via URL
  app.get("/storm", homeController.showPhoto);
  app.post("/contact", homeController.showPostedForm);

  app.use(
    express.urlencoded({
      extended: false
    })
  );

  app.use(express.json());

  app.use(errorController.pageNotFound);
  app.use(errorController.internalServerError);

  app.listen(app.get("port"), () => {
    console.log(
      `Server running at http://localhost:${app.get("port")}`
    );
  });
