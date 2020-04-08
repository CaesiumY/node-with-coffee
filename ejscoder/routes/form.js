var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("form", { title: "Form 테스트" });
});

module.exports = router;
