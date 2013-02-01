#
# * GET home page.
# 
getBoards = (req, res, callback) ->
  connection = require("../modules/mysql").db()
  connection.query "SELECT * FROM boards ORDER BY sticky DESC, name ASC", [], (err, rows, fields) ->
    throw err  if err
    unless callback
      res.send rows
    else
      callback rows

exports.index = (req, res) ->
  getBoards req, res, (rows) ->
    console.log rows
    res.render "index",
      title: "Nodelauta"
      rows: rows



exports.boards = (req, res) ->
  getBoards req, res
