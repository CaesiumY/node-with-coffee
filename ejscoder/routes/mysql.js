var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.get("/", (req, res, next) => {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gocodermysql",
    database: "nodedb",
    // 예시용 mysql 정보
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
