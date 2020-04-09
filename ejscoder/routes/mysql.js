var express = require("express");
var router = express.Router();
var mysql_odbc = require("../db/db_conn");
var conn = mysql_odbc.init();

router.get("/", (req, res, next) => {
  var connection = conn;

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
