mongoose = require('mongoose')

getBoards = (req, res, callback) ->
  boards = mongoose.model 'boards'

  boards.find { }, (err, data) ->
    unless callback
      res.jsonp data
    else
      callback data

exports.index = (req, res) ->
  getBoards req, res, (rows) ->
    res.render "index",
      rows: rows

exports.boards = (req, res) ->
  getBoards req, res

exports.createBoard = (req, res) ->
  Boards = mongoose.model 'boards'
  board = new Boards {
    name: req.body.name
    url: req.body.url
    sticky: req.body.sticky
  }
  board.save (err) ->
    res.jsonp done: true
