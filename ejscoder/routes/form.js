var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("form", {
    name: "Caesiumy",
    blog: "caesiumy.github.io",
    hompage: "github.io",
  });
});

router.post("/", (req, res, next) => {
  res.json(req.body);
});

module.exports = router;
