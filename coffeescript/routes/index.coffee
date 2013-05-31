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
    console.log rows
    res.render "index",
      title: "Nodelauta"
      rows: rows

exports.boards = (req, res) ->
  getBoards req, res

exports.createBoard = (req, res) ->
  console.log "creating board"
  Boards = mongoose.model 'boards'
  board = new Boards {
    name: req.body.name
    url: req.body.url
    sticky: req.body.sticky
  }
  board.save (err) ->
    console.log 'row saved'
