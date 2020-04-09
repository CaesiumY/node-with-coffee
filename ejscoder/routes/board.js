var express = require("express");
var router = express.Router();
var mysql_odbc = require("../db/db_conn")();
var conn = mysql_odbc.init();

router.get("/list", (req, res, next) => {
  res.redirect("/board/list/1");
});

router.get("/list/:page", (req, res, next) => {
  var page = req.params.page;

  var sql =
    "select idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate from board";

  conn.query(sql, (err, rows) => {
    if (err) console.err("err:", err);
    res.render("list", { title: "게시판 리스트", rows });
  });
});

module.exports = router;
