var express = require("express");
var mysql = require("mysql");
var config = require("../db/db_info").local;
var router = express.Router();

router.get("/", (req, res, next) => {
  var connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });

  connection.connect((err) => {
    if (err) {
      res.render("mysql", { connect: "연결 실패", err });
      console.log("err", err);
      throw err;
    } else {
      res.render("mysql", { connect: "연결 성공", err: "없음" });
    }
  });

  connection.end();
});

module.exports = router;
