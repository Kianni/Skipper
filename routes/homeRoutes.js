const router = require("express").Router(),
  homeController = require("../controllers/homeController");

router.get("/", homeController.welcome);
router.get("/contact", homeController.contact);
router.get("/chat", homeController.chat);

module.exports = router;
