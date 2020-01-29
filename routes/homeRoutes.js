const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/", homeController.welcome);
router.get("/contact", homeController.contact);

module.exports = router;
