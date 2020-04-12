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
    "select idx, name, title, hit, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate from board";

  conn.query(sql, (err, rows) => {
    if (err) console.err("err:", err);
    res.render("list", { title: "게시판 리스트", rows });
  });
});

router.get("/write", (req, res, next) => {
  res.render("write", { title: "글쓰기" });
});

router.post("/write", (req, res, next) => {
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.password;
  var datas = [name, title, content, passwd];

  var sql =
    "insert into board(name, title, content, regdate, modidate, passwd, hit) values (?, ?, ?, now(), now(), ?, 0)";
  conn.query(sql, datas, (err, rows) => {
    if (err) console.log("err", err);
    res.redirect("/board/list");
  });
});

router.get("/read/:idx", (req, res, next) => {
  var idx = req.params.idx;

  var sql =
    "select idx, name, title, content, hit, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate from board where idx=?";

  conn.query(sql, [idx], (err, row) => {
    console.log("row", row);
    if (err) console.log("err", err);
    res.render("read", { title: "글 상세", row: row[0] });
  });
});

router.post("/update", (req, res, next) => {
  var idx = parseInt(req.body.idx);
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;
  var datas = [name, title, content, idx, passwd];

  var sql =
    "update board set name=?, title=?, content=?, modidate=now() where idx=? and passwd=?";
  conn.query(sql, datas, (err, result) => {
    if (err) console.log("err", err);
    if (result.affectedRows == 0) {
      res.send(
        '<script>alert("패스워드가 일치하지 않습니다"); history.back(); </script>'
      );
    } else {
      res.redirect("/board/read/" + idx);
    }
  });
});

module.exports = router;
