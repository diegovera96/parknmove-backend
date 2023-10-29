var express = require("express");
var userController = require("../controllers/userController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use(express.json());
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;
