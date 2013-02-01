exports.getThreads = (req, res) ->
  connection = require("../modules/mysql").db()
  connection.query "SELECT * FROM posts WHERE threadid IS NULL AND boardid = ? ORDER BY lastpost DESC", [req.params["id"]], (err, rows, fields) ->
    throw err  if err
    res.send rows


exports.getPosts = (req, res) ->
  connection = require("../modules/mysql").db()
  connection.query "SELECT * FROM posts WHERE threadid = ? ORDER BY created DESC", [req.params["id"]], (err, rows, fields) ->
    throw err  if err
    res.send rows


exports.post = (req, res) ->
  connection = require("../modules/mysql").db()
  fs = require("fs")
  connection.query "INSERT INTO posts (threadid, boardid, title, content, image, created, lastpost) VALUES (?,?,?,?,?,NOW(),NOW())", [req.body.thread, req.body.board, req.body.title, req.body.content, req.body.base64], (err, rows, fields) ->
    throw err  if err

  if req.body.thread
    connection.query "UPDATE posts SET lastpost = NOW() WHERE id = ?", [req.body.thread], (err, rows, fields) ->
      throw err  if err

  res.send "post " + req.body.id
