var express = require("express");
var UserController = require("../controllers/UserController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use(express.json());
router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);
router.get("/user/getUsers", UserController.getUsers);
router.get("/user/getUser:id", UserController.getUsers);

module.exports = router;
